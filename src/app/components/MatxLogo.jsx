import useSettings from 'app/hooks/useSettings';

const MatxLogo = ({ className }) => {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    <img src="/assets/images/dataproj/logoMantelcoa.svg" width="100%" alt="" />
  );
};

export default MatxLogo;
