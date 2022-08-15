import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header({ username }) {
    return (
        <div className="flex border-b border-gray-primary h-4 p-4 py-8">
            <div className="flex items-center">
                <Link to={`/p/${username}`} className="flex items-center">
                    <img 
                        src={`/images/avatars/${username}.jpg`} 
                        alt={`${username} profile picture`} 
                        className="rounded-full h-8 w-8 flex mr-3"
                        onError={(e) => {e.target.src='/images/avatars/default.png';e.target.onerror='';}}
                    />
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
        </div>
    )
}

Header.propTypes = {
    username: PropTypes.string.isRequired
}