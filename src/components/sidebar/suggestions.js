/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';

export default function Suggestions({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState(null);
  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }
    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-item justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions For You</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <div>
            <SuggestedProfile
              key={profile.docId}
              suggestedProfileDocId={profile.docId}
              username={profile.username}
              profileId={profile.userId}
              userId={userId}
              loggedInUserDocId={loggedInUserDocId}
            />
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string
};
