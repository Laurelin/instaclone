import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/outline';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';

export default function Header() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const history = useHistory();

  return (
    <header className="h-16 bg-white dark:bg-black-backgroundlight border-b border-gray-primary dark:border-black-light mb-8 ">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Instaclone logo">
                <picture>
                  <source
                    srcSet="/images/logoinverted.png"
                    media="(prefers-color-scheme: dark)"
                    alt="Instaclone"
                    className="mt-2 w-6/12"
                  />
                  <img src="/images/logo.png" alt="Instaclone" className="mt-2 w-6/12" />
                </picture>
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 dark:text-gray-secondary text-center flex items-center align-items">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <HomeIcon className="w-8 mr-6 text-black-light dark:text-gray-secondary cursor-pointer" />
                </Link>
                <button
                  type="button"
                  title="Log Out"
                  aria-label="Log Out"
                  onClick={() => {
                    firebase.auth().signOut();
                    history.push(ROUTES.LOGIN);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      firebase.auth().signOut();
                      history.push(ROUTES.LOGIN);
                    }
                  }}
                >
                  <svg
                    className="w-8 mr-6 text-black-light dark:text-gray-secondary cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={`/images/avatars/${user.displayName}.jpg`}
                      alt={`${user.displayName}'s profile`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white dark:text-gray-primary w-20 h-8 m-1"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8 m-1"
                  >
                    Sign Up
                  </button>{' '}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
