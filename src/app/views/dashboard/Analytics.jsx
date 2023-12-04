import { styled } from '@mui/material';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Analytics = () => {

  return (
    <>
      <ContentBox className="analytics">
      <img src="/assets/images/dataproj/image1.svg" width="100%" alt="" />
      </ContentBox>
    </>
  );
};

export default Analytics;
