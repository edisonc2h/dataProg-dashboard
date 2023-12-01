export const navigations = [
  { name: 'INICIO', path: '/dashboard/default', icon: 'home' },
  {
    name: 'ADMINISTRADOR',
    icon: 'settings_suggest',
    children: [
      { name: 'Usuarios', iconText: 'SI', path: '/users', icon: 'double_arrow' },
      { name: 'Perfil', iconText: 'SI', path: '/profiles', icon: 'double_arrow' },
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
];
