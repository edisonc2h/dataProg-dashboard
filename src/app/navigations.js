export const navigations = [
  { name: 'INICIO', path: '/dashboard/default', icon: 'home', show: false },
  {
    name: 'ADMINISTRADOR',
    icon: 'settings_suggest',
    children: [
      { name: 'Perfil', iconText: 'SI', path: '/profiles', icon: 'double_arrow', show: false, toMenu: true, },
      { name: 'Nuevo Perfil', path: '/profiles/new', show: false, toMenu: false,  },
      { name: 'Usuarios', iconText: 'SI', path: '/users', icon: 'people', show: false, toMenu: true, },
      { name: 'Nuevo Usuario', path: '/users/new', show: false, toMenu: false, },
    ],
    show: false,
    toMenu: true,
  },
  {
    name: 'PORTAL',
    icon: 'dashboard',
    children: [],
    show: false,
    toMenu: true,
    path: '/portal'
  },
  {
    name: 'CONSULTAS',
    icon: 'list',
    children: [],
    show: false,
    toMenu: true,
    path: '/consultas'
  },
  { name: 'DESCARGA', path: '/downloads', icon: 'download', show: false, toMenu: true, },
  { name: 'CONSULTA SB', path: '/consulta_sb', icon: 'search', show: false, toMenu: true, },
  { name: 'CONSULTA SEPS', path: '/consulta_seps', icon: 'search', show: false, toMenu: true, },
];
