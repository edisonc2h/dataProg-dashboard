import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const UsersTable = Loadable(lazy(() => import('./UsersTable')));
const NewUser = Loadable(lazy(() => import('./NewUser')));
const EditUser = Loadable(lazy(() => import('./EditUser')));

const usersRoutes = [
  { path: '/users', element: <UsersTable />, auth: authRoles.admin },
  { path: '/users/new', element: <NewUser />, auth: authRoles.admin },
  { path: '/users/edit/:id', element: <EditUser />, auth: authRoles.admin },
];

export default usersRoutes;