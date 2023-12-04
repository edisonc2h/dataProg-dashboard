import { themes } from '../MatxTheme/initThemes';
import layout1Settings from './Layout1/Layout1Settings';

export const MatxLayoutSettings = {
  activeLayout: 'layout1', // layout1, layout2
  activeTheme: 'blue', // View all valid theme colors inside MatxTheme/themeColors.js
  perfectScrollbar: false,
  themes: themes,
  layout1Settings, // open Layout1/Layout1Settings.js
  secondarySidebar: {
    show: true,
    open: false,
    theme: 'slateDark1', // View all valid theme colors inside MatxTheme/themeColors.js
  },
  footer: {
    show: false,
    fixed: false,
    theme: 'blueDark', // View all valid theme colors inside MatxTheme/themeColors.js
  },
};
