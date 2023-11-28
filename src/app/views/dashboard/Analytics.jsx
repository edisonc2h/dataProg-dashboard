import { Card, Grid, styled } from '@mui/material';
import StatCards from './shared/StatCards';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const Analytics = () => {

  return (
    <>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Traffic Sources d</Title>
              <SubTitle>Last 30 days</SubTitle>
            </Card>
          </Grid>
        </Grid>
      </ContentBox>
    </>
  );
};

export default Analytics;
