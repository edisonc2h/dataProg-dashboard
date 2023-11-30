import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const UsersTable = Loadable(lazy(() => import('./UsersTable')));

const usersRoutes = [
  { path: '/users', element: <UsersTable />, auth: authRoles.admin },
];

export default usersRoutes;