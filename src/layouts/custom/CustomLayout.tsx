import { Box } from '@mui/material';
import React, { ReactNode } from 'react';
import { CustomHeader } from 'src/layouts/custom/CustomHeader';

export function CustomLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomHeader />
      <Box component="main" sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {children}
      </Box>
    </>
  );
}
