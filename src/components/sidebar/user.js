import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ContentLoader from "react-content-loader"
import { memo } from 'react';

function User({ username, fullName, profilePic }) {
  //223 64
  return !username || !fullName ? (
    <ContentLoader 
        speed={2}
        viewBox="0 0 300 85"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        width="100%" 
        height="4rem"
        className='mb-6'
    > 
        <rect width="100%" height="100%" y="0" />
    </ContentLoader>
  ) : (
    <Link to={`/p/${username}`} className="grid grid-cols-4 mb-6 items-stretch w-320-px">
      <div className="flex items-center justify-between col-span-1">      
        <img
          className="rounded-full w-pers h-56-px w-56-px mr-3 object-cover"
          src={profilePic}
          alt=""
          onError={(e) => {e.target.src='/images/avatars/default.png';e.target.onerror='';}}
        />
      </div>
      <div className="col-span-3 flex flex-col justify-center ml-minus-px">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm font-semibold text-gray-light">{fullName}</p>
      </div>
    </Link>
  );
}

export default User;

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string
};
