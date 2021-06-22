/** @format */
import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const history = useHistory();
  const inputRef = useRef();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '' || username === '' || fullName === '';

  const handleSignUp = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExist(username);
    console.log('usernameExists', usernameExists);
    if (!usernameExists) {
      try {
        // authentication
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        await createdUserResult.user.updateProfile({
          displayName: username
        });

        // firebase, create a document in user collection
        await firebase
          .firestore()
          .collection('users')
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: ['Dn2sdSmo7JTcuE1wvcNbBPVNPUK2'], // auto-follows me
            dateCreated: Date.now()
          });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setUsername('');
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setError('That username is already taken, please try another');
    }
    // try {
    // } catch (error) {}
  };

  useEffect(() => {
    document.title = 'Sign Up - Instaclone';
    inputRef.current.focus();
  }, []);

  return (
    <div>
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

            <form onSubmit={handleSignUp} method="POST">
              <input
                ref={inputRef}
                aria-label="Enter your username"
                type="text"
                placeholder="Username"
                className="dark:bg-black-background text-s text-gray-base dark:text-gray-secondary w-full mr-3 py-5 px-4 h-2 border border-gray-primary dark:border-black-light rounded mb-2"
                onChange={({ target }) => setUsername(target.value)}
                value={username}
              />
              <input
                aria-label="Enter your full name"
                type="text"
                placeholder="Full Name"
                className="dark:bg-black-background text-s text-gray-base dark:text-gray-secondary w-full mr-3 py-5 px-4 h-2 border border-gray-primary dark:border-black-light rounded mb-2"
                onChange={({ target }) => setFullName(target.value)}
                value={fullName}
              />
              <input
                aria-label="Enter your Email Address"
                type="text"
                placeholder="Email Address"
                className="dark:bg-black-background text-s text-gray-base dark:text-gray-secondary w-full mr-3 py-5 px-4 h-2 border border-gray-primary dark:border-black-light rounded mb-2"
                onChange={({ target }) => setEmailAddress(target.value)}
                value={emailAddress}
              />
              <input
                aria-label="Enter your Password"
                type="password"
                placeholder="Password"
                className="dark:bg-black-background text-s text-gray-base dark:text-gray-secondary w-full mr-3 py-5 px-4 h-2 border border-gray-primary dark:border-black-light rounded mb-2"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white dark:text-black-background w-full rounded h-8 font-semibold
              ${isInvalid && 'opacity-50'}`}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white dark:bg-black-backgroundlight p-4 border border-gray-primary dark:border-black-light">
            <p className="text-sm dark:text-gray-secondary">
              Have an account?{` `}
              <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
