import axios from 'axios'
import {
  getAuthToken,
  getRefreshToken,
  setAuthToken,
  getMiddleAuthToken,
} from './utils'
import { getMiddlewareAuthTokenReturn } from '../actions/hotelSearchAction'
import store from '../store/store'
import { setToken, logout, navigatetoLoginTrue } from '../store/userSlice'

const baseURL = "base_url";
/**AXIOS INTERCEPTORS - API */
const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  let isRefreshing = false
  let refreshSubscribers = []

  instance.interceptors.request.use(
    (config) => {
      if (config?.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data'
      }
      const token = getAuthToken()
      config.headers['Authorization'] = `Bearer ${token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    (response) => {
      if (response?.status === 200) {
        return response.data
      }
      return response
    },
    (error) => {
      const originalRequest = error.config
      // Fix the typo in the following line

      console.log('Original Request', originalRequest)
      console.log('Error Axios', error)
      console.log('Error Axios response', error.response)

      // If the error status is 401 (unauthorized) and it's not a token refresh request
      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        if (isRefreshing) {
          // If refresh token request is already in progress, wait for new token and retry the original request
          return new Promise((resolve) => {
            refreshSubscribers.push((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(instance(originalRequest))
            })
          })
        }

        //originalRequest._retry = false;

        // nmj._retry = true;

        // Perform your refresh token API call here
        return new Promise((resolve, reject) => {
          isRefreshing = true
          const refreshToken = getRefreshToken()
          axios
            .post(`${baseURL}b2c/authenticate/refreshtoken`, {
              refreshToken: refreshToken,
            })
            .then((response) => {
              if (response.status === 'success') {
                const newAccessToken = response.data.data
                // Update the token in your Axios instance
                instance.defaults.headers.common[
                  'Authorization'
                ] = `Bearer ${newAccessToken}`
                setAuthToken(newAccessToken)
                store.dispatch(
                  setToken({ auth: newAccessToken, refresh: refreshToken }),
                )

                // Update the token in the original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                resolve(instance(originalRequest))
                // Execute the pending requests after token refresh
                refreshSubscribers.forEach((callback) =>
                  callback(newAccessToken),
                )
                refreshSubscribers = []
              } else {
                store.dispatch(navigatetoLoginTrue())
                //store.dispatch(logout())
              }
            })
            .catch((error) => {
              store.dispatch(navigatetoLoginTrue())
              //store.dispatch(logout())
              reject(error)
            })
            .finally(() => {
              isRefreshing = false
            })
        })
      } else {
        console.log('Axios', error)
      }

      return Promise.reject(error)
    },
  )

  return instance
}

/**AXIOS INTERCEPTORS - API */
const createAxiosMiddlewareInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 500000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  let isRefreshing = false
  let refreshSubscribers = []

  instance.interceptors.request.use(
    (config) => {
      if (config?.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data'
      }
      const token = getMiddleAuthToken()
      config.headers[
        'Authorization'
      ] = `${token.token_type} ${token.access_token}`
      config.headers['subscription-key'] = middleware_subscription_key
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    (response) => {
      if (response?.status === 200) {
        return response.data
      }
      return response
    },
    (error) => {
      const originalRequest = error.config

      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const token = getMiddlewareAuthTokenReturn()
          originalRequest.headers.Authorization = `${token.token_type} ${token.access_token}`
          return axios(originalRequest)
        } catch (error) {
          store.dispatch(navigatetoLoginTrue())
        }
      } else {
        console.log('Axios', error)
        // store.dispatch(navigatetoLoginTrue())
      }

      return Promise.reject(error)
    },
  )

  return instance
}

export const axiosInstance = createAxiosInstance(context_port)
export const axiosInstanceMiddleware = createAxiosMiddlewareInstance(
  context_port_middleware,
)

export default axiosInstance
