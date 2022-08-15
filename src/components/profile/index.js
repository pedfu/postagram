import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import { getUserPhotosByUserId } from '../../services/firebase';
import Header from './header';
import Photos from './photos';

export default function Profile({ user }) {
    const reducer = (state, newState) => ({ ...state, ...newState});
    const initialState = {
        profile: {},
        photosCollection: [],
        followersCount: 0
    }

    const [{ profile, photosCollection, followersCount }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUserId(user.userId);
            dispatch({ profile: user, photosCollection: photos, followersCount: user.followers.length });
        }
        getProfileInfoAndPhotos();
    }, [user])

    return(
        <>
            <Header 
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followersCount={followersCount}
                setFollowersCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </>
    )
}

Profile.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        dateCreated: PropTypes.number.isRequired
      }).isRequired
}