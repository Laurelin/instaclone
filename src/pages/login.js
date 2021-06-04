/** @format */
import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const inputRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - Instaclone';
    inputRef.current.focus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-background dark:bg-black-background">
      <div className="container flex mx-auto max-w-screen-md items-center h-screen">
        <div className="flex w-3/5">
          <img src="/images/transparent-phone-with-profile.png" alt="iPhone with Instagram" />
        </div>
        <div className="flex flex-col w-2/5">
          <div className="flex flex-col items-center bg-white dark:bg-black-backgroundlight p-4 border border-gray-primary dark:border-black-light mb-4">
            <h1 className="flex justify-center w-full">
              <picture>
                <source
                  srcSet="/images/logoinverted.png"
                  media="(prefers-color-scheme:dark)"
                  alt="Instaclone"
                  className="mt-2 w-6/12 mb-4"
                />
                <img src="/images/logo.png" alt="Instaclone" className="mt-2 w-6/12 mb-4" />
              </picture>
            </h1>

            {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

            <form onSubmit={handleLogin} method="POST">
              <input
                ref={inputRef}
                aria-label="Enter your Email Address"
                type="text"
                placeholder="Email Address"
                className="dark:bg-black-background text-sm text-gray-base dark:text-gray-secondary w-full mr-3 py-5 px-4 h-2 border border-gray-primary dark:border-black-faded rounded mb-2 "
                onChange={({ target }) => setEmailAddress(target.value)}
              />
              <input
                aria-label="Enter your Password"
                type="password"
                placeholder="Password"
                className="dark:bg-black-background text-sm text-gray-base dark:text-gray-secondary w-full mr-3 py-5 px-4 h-2 border border-gray-primary dark:border-black-faded rounded mb-2"
                onChange={({ target }) => setPassword(target.value)}
              />
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white dark:text-black-background w-full rounded h-8 font-semibold
              ${isInvalid && 'opacity-50'}`}
              >
                Log In
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white dark:bg-black-backgroundlight p-4 border border-gray-primary dark:border-black-light">
            <p className="text-sm dark:text-gray-secondary">
              Don't have an account?{` `}
              <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
