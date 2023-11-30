export const navigations = [
  { name: 'INICIO', path: '/dashboard/default', icon: 'home' },
  {
    name: 'ADMINISTRADOR',
    icon: 'settings_suggest',
    children: [
      { name: 'Usuarios', iconText: 'SI', path: '/users', icon: 'double_arrow' },
      { name: 'Perfil', iconText: 'SI', path: '/profile', icon: 'double_arrow' },
      { name: 'Menú', iconText: 'SI', path: '/menu', icon: 'double_arrow' },
      { name: 'Perfil - Proceso', iconText: 'SI', path: '/profile-process', icon: 'double_arrow' },
      { name: 'Usuario - Perfil', iconText: 'SI', path: '/user-profile', icon: 'double_arrow' },
    ],
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
