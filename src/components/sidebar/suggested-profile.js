import { useState } from "react";
import { Link } from "react-router-dom";
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from "../../services/firebase";
import PropTypes from 'prop-types';

export default function SuggestedProfile({ profileDocId, username, profileId, userId, loggedInUserDocId }) {
    const [followed, setFollowed] = useState(false);

    async function handleFollowUser() {
        setFollowed(true);
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        await updateFollowedUserFollowers(profileDocId, userId, false);
    }

    return !followed ? (
        <div className="flex flex-row items-center justify-between w-320-px">
            <div className="flex items-center justify-between">
                <img className="rounded-full h-32-px w-32-px flex mr-3" src={`/images/avatars/${username}.jpg`} alt="" onError={(e) => {e.target.src='/images/avatars/default.png';e.target.onerror='';}} />
                <div>
                    <Link to={`/p/${username}`}>
                        <p className="font-bold text-sm hover:underline">{username}</p>
                    </Link>
                    <p className="font-semibold text-xs text-gray-light">some random text</p>
                </div>
            </div>
            <button className="text-blue-medium text-xs font-bold" type="button" onClick={handleFollowUser}>
                Follow
            </button>
        </div>
    ) : null;
}

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string,
    username: PropTypes.string,
    profileId: PropTypes.string,
    userId: PropTypes.string,
    loggedInUserDocId: PropTypes.string,
}