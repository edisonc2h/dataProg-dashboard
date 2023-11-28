export const navigations = [
  { name: 'INICIO', path: '/dashboard/default', icon: 'home' },
  {
    name: 'ADMINISTRADOR',
    icon: 'settings_suggest',
    children: [],
  },
  {
    name: 'PORTAL',
    icon: 'dashboard',
    children: [],
  },
  {
    name: 'CONSULTAS',
    icon: 'list',
    children: [],
  },
  { name: 'DESCARGA', path: '/download', icon: 'download' },
  { name: 'CONSULTA SB', path: '/consulta_sb', icon: 'search' },
  { name: 'CONSULTA SEPS', path: '/consulta_seps', icon: 'search' },
  {
    name: 'Session/Auth',
    icon: 'security',
    children: [
      { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
      { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
      { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
      { name: 'Error', iconText: '404', path: '/session/404' },
    ],
  },
];
