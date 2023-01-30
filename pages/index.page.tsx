import { Paper, useTheme } from '@mui/material';
import { ContentContainer } from 'src/components/ContentContainer';
import { TopInfoPanel } from 'src/components/TopInfoPanel/TopInfoPanel';
import { CustomLayout } from 'src/layouts/custom/CustomLayout';
import RegisterDomain from 'src/modules/custom/RegisterDomain';

export default function HomePage() {
  const theme = useTheme();

  return (
    <>
      <TopInfoPanel />
      <ContentContainer>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            p: 4,
            flex: 1,
            backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : '',
          }}
        >
          <RegisterDomain />
        </Paper>
      </ContentContainer>
    </>
  );
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <CustomLayout>{page}</CustomLayout>;
};
