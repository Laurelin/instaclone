import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import UserContext from '../../context/user';
import {
  isUserFollowingProfile,
  updateFollowedUserFollowers,
  updateLoggedInUserFollowing
} from '../../services/firebase';

export default function Header({ photosCount, profile, followerCount, setFollowerCount }) {
  const { user: loggedinUser } = useContext(UserContext);
  const { user } = useUser(loggedinUser?.uid);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== profile.username;

  const handleToggleFollow = async () => {
    await updateLoggedInUserFollowing(user.docId, profile.userId, isFollowingProfile);
    await updateFollowedUserFollowers(profile.docId, user.userId, isFollowingProfile);
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
  };

  useEffect(() => {
    const isLoggedinUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username, profile.userId);
      setIsFollowingProfile(isFollowing);
    };
    if (user?.username && profile.userId) {
      isLoggedinUserFollowingProfile();
    }
  }, [profile.userId, user?.username]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <div className="container flex justify-center">
          {profile.username && (
            <img
              className="rounded-full h-40 w-40 flex"
              alt={`${profile.username}'s avatar`}
              src={`/images/avatars/${profile.username}.jpg`}
            />
          )}
        </div>
        <div className="flex flex-col items-center justify-center col-span-2">
          <div className="container flex items-center">
            <p className="text-2xl mr-4">{profile.username}</p>
            {activeBtnFollow && (
              <button
                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                type="button"
                onClick={handleToggleFollow}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleToggleFollow();
                  }
                }}
              >
                {isFollowingProfile ? 'Unfollow' : 'follow'}
              </button>
            )}
          </div>
          <div className="container flex mt-4">
            {!profile.followers || !profile.following ? (
              <Skeleton count={1} width={677} height={24} />
            ) : (
              <>
                <p className="mr-10">
                  <span className="font-bold">{photosCount}</span> photos
                </p>
                <p className="mr-10">
                  <span className="font-bold">{followerCount}</span>
                  {` `}
                  {followerCount === 1 ? `follower` : `followers`}
                </p>
                <p className="mr-10">
                  <span className="font-bold">{profile.following.length}</span> following
                </p>
              </>
            )}
          </div>
          <div className="container mt-4">
            <p className="font-medium">
              {!profile.fullName ? <Skeleton count={1} height={24} /> : profile.fullName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    username: PropTypes.string,
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array
  }).isRequired
};
