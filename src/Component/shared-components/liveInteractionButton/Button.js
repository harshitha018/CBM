import React from 'react';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';

export default function CustomButton({ children, backgroundColor,borderRadius }) {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: { minWidth: "30px", padding: 4, backgroundColor, borderRadius  },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Button>
        {children}
      </Button>
    </ThemeProvider>
  );
}
