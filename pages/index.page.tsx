import { DuplicateIcon, RefreshIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { Box, Button, Link, Paper, SvgIcon, Typography, useTheme } from '@mui/material';
import { ContentContainer } from 'src/components/ContentContainer';
import { TopInfoPanel } from 'src/components/TopInfoPanel/TopInfoPanel';
import { MainLayout } from 'src/layouts/MainLayout';

export default function Aave500Page() {
  const theme = useTheme();

  const handleCopyError = () => {
    console.log('copying error to clipboard');
  };

  return (
    <>
      <TopInfoPanel />
      <ContentContainer>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: 4,
            flex: 1,
            backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : '',
          }}
        >
          <Typography variant="display1" sx={{ mt: 8, mb: 3 }}>
            <Trans>HOME PAGE</Trans>
          </Typography>
          <Typography sx={{ mt: 2, mb: 5, maxWidth: 480 }}>
            <Trans>
              Sorry, an unexpected error happened. In the meantime you may try reloading the page,
              or come back later.
            </Trans>
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={
              <SvgIcon>
                <RefreshIcon />
              </SvgIcon>
            }
            onClick={() => window.location.reload()}
            sx={{ mb: 10 }}
          >
            <Trans>Reload the page</Trans>
          </Button>
        </Paper>
      </ContentContainer>
    </>
  );
}
