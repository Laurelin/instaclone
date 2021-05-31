import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

export default function User({ username, fullName, test }) {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
      <div className="flex items-center justify-between col-span-1">
        {test}
        <img
          className="h-16 w-16 rounded-full flex"
          src={`/images/avatars/${username}.jpg`}
          alt="avatar"
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm dark:text-gray-primary">{username}</p>
        <p className="text-sm dark:text-gray-primary">{fullName}</p>
      </div>
    </Link>
  );
}
User.whyDidYouRender = true;

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
  test: PropTypes.number
};
