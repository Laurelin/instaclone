import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      // we have a user, therefore we can store the user in localstorage
      console.log('authUser from the hook: ', authUser);
      if (authUser) {
        // login
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // no authUser, clear localStorage, logout
        localStorage.removeItem('authUser');
        setUser(null);
      }
      console.log('User from the hook:', user);
    });

    return () => listener();
  }, [firebase, user]);

  return { user };
}
