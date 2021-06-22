import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';

export default function Profile() {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    document.title = `${username}'s Profile`;
    async function getProfile() {
      const [currentProfile] = await getUserByUsername(username);
      if (currentProfile?.userId) {
        setProfileUser(currentProfile);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    getProfile();
  }, [history, username]);

  return profileUser?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={profileUser} />
      </div>
    </div>
  ) : null;
}
