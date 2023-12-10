import useAuth from 'app/hooks/useAuth';
import { flat } from 'app/utils/utils';
import { Navigate, useLocation } from 'react-router-dom';
import AllPages from '../routes';
import { navigations } from 'app/navigations';


const userHasPermission = (pathname, user, routes) => {
  if (!user) {
    return false;
  }
  const matched = routes.find((r) => r.path === pathname);
  if (matched) {
    console.log(pathname)
  console.log(matched)
  console.log(navigations)
  let authenticated = false;
  Array.from(navigations).forEach(function (navigation) {
    if (navigation.children && navigation.children.length > 0) {
      Array.from(navigation.children).forEach(function (navigation2) {
        if (navigation2.path === matched.path && navigation2.show) {
          authenticated = true;
        }
      })
    } else {
      if (navigation.path === matched.path && navigation.show) {
        authenticated = true;
      }
    }
  
  });

  console.log(authenticated)
  return authenticated;
  }

  return true;
};

const AuthGuard = ({ children }) => {

  Array.from(navigations).forEach(function (navigation) {
    navigation.show = false;
    if (navigation.children && navigation.children.length > 0) {
      Array.from(navigation.children).forEach(function (navigation2) {
        navigation2.show = false;
      });
    }
  });

  let {
    isAuthenticated,
     user
  } = useAuth();
  const { pathname } = useLocation();

  if (user && user.profile && user.profile.menu) {
    let menu = user.profile.menu;
    
      Array.from(navigations).forEach(function (navigation) {
        if (navigation.children && navigation.children.length > 0) {
          Array.from(navigation.children).forEach(function (navigation2) {
            Array.from(menu).forEach(function (itemMenu) {
              if (navigation2.path === itemMenu.path && itemMenu.selected === true) {
                navigation2.show = true;
                navigation.show = true;
              }
            });
          });
        } else {
          Array.from(menu).forEach(function (itemMenu) {
            if (navigation.path === '/dashboard/default') {
              navigation.show = true;
            }
            if (navigation.path === itemMenu.path && itemMenu.selected === true) {
              navigation.show = true;
            }

          });
        }
      });
  }

  const routes = flat(AllPages);
  const hasPermission = userHasPermission(pathname, user, routes);
  let authenticated = isAuthenticated && hasPermission;
  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/session/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
