export const navigations = [
  { name: 'INICIO', path: '/dashboard/default', icon: 'home' },
  {
    name: 'ADMINISTRADOR',
    icon: 'settings_suggest',
    children: [
      { name: 'Perfil', iconText: 'SI', path: '/profiles', icon: 'double_arrow' },
      { name: 'Usuarios', iconText: 'SI', path: '/users', icon: 'people' },
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
