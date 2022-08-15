import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import useUser from '../../hooks/use-user';
import { firebase } from '../../lib/firebase';
import updateProfileImage, { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

export default function Header({ photosCount, profile: { docId: profileDocId, userId: profileUserId, fullName, following=[], followers=[], username: profileUsername, imageSrc }, followersCount, setFollowersCount }) {   
    const { user } = useUser();
    const [profilePicture, setProfilePicture] = useState(null);
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profileUsername;
    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowersCount({ 
            followersCount: isFollowingProfile ? followersCount - 1 : followersCount + 1
        });
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
    };
    const updateProfilePic = async () => {
        if(profileDocId === user.docId) {
            updateProfileImage(user.docId, profilePicture);
        }
    }
    const handleProfilePicture = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setProfilePicture(reader.result); 
                imageSrc = reader.result;
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    
    useEffect(() => { 
        updateProfilePic();
    }, [profilePicture, setProfilePicture])

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(isFollowing);
        }
        if(user.username && profileUserId) {
            isLoggedInUserFollowingProfile();
            setProfilePicture(imageSrc);
        }
        if(!imageSrc && !profilePicture) {
            setProfilePicture('/images/avatars/default.png')
        }
    }, [user.username, profileUserId]);

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                {user.username && (
                    <label className="cursor-pointer">
                        <img 
                            className="rounded-full h-40 w-40 flex object-cover"
                            alt={`${profileUsername} profile picture`}
                            src={profilePicture}
                            onError={(e) => {e.target.src='/images/avatars/default.png';e.target.onerror='';}}  
                        />
                        <input className="hidden" type='file' accept="images/*" onChange={handleProfilePicture} />
                    </label>
                )}
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-3xl mr-4 font-thin">{profileUsername}</p>
                    {activeBtnFollow && (
                        <button 
                            className={`${isFollowingProfile ? 'bg-gray-background border border-gray-light text-black-black' : 'bg-blue-medium text-white'} font-semibold text-sm rounded  w-20 h-8`}
                            type="button"
                            onClick={handleToggleFollow}
                            onKeyDown={(event) => {
                                if(event.key === 'Enter') {
                                    handleToggleFollow();
                                }
                            }}
                        >
                            {isFollowingProfile ? 'Following' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className="flex container mt-6">
                    {followers === undefined || following === undefined ? (
                        <div>Carregando - colorcar o skeleton</div>
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className=""><span className="font-semibold">{photosCount}</span> {photosCount > 1 ? 'posts' : 'post'}</span>
                            </p>
                            <p className="mr-10">
                                <span className=""><span className="font-semibold">{followersCount}</span> {followersCount > 1 ? 'followers' : 'follower'}</span>
                            </p>
                            <p className="mr-10">
                                <span className=""><span className="font-semibold">{following.length}</span> following</span>
                            </p>
                        </>
                    )}
                </div>
                <div className="container mt-6">
                    <p className="font-bold">{!fullName ? 'Adicionar esqueleto aqui' : fullName}</p>
                    <p className="text-gray-light">Profession</p>
                    <div>
                        <p>Profile description</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    photosCount: PropTypes.number.isRequired, 
    followersCount: PropTypes.number.isRequired, 
    setFollowersCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string,
        following: PropTypes.array,
        followers: PropTypes.array,
        fullName: PropTypes.string,
    }).isRequired, 
}