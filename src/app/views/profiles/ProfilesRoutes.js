import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const ProfilesTable = Loadable(lazy(() => import('./ProfilesTable')));
const NewProfile = Loadable(lazy(() => import('./NewProfile')));
const EditProfile = Loadable(lazy(() => import('./EditProfile')));

const usersRoutes = [
  { path: '/profiles', element: <ProfilesTable />, auth: authRoles.admin },
  { path: '/profiles/new', element: <NewProfile />, auth: authRoles.admin },
  { path: '/profiles/edit/:id', element: <EditProfile />, auth: authRoles.admin },
];

export default usersRoutes;