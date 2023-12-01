import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const ProfilesTable = Loadable(lazy(() => import('./ProfilesTable')));

const profileRoutes = [
  { path: '/profiles', element: <ProfilesTable />, auth: authRoles.admin },
];

export default profileRoutes;