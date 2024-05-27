import React from 'react'

const Error = ({ children }) => {
    if (!children) return null
    return (
        <section className='text-red-600 lowercase text-left'>{children}</section>
    )
}

export default Error