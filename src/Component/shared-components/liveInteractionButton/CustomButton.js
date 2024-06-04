import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';

export default function CustomButton({ children, backgroundColor, borderRadius, tooltipTitle, onClick }) {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: { minWidth: "30px", padding: 4,":hover":"red", backgroundColor, borderRadius },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Tooltip title={tooltipTitle}>
        <Button onClick={onClick}>
          {children}
        </Button>
      </Tooltip>
    </ThemeProvider>
  );
}
