import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';

export default function Suggestions({ userId, following, loggedInUserDocId }) {
    const [profiles, setProfiles] = useState(null);   
    
    useEffect(() => {
      async function suggestedProfiles(userId) {
        const response = await getSuggestedProfiles(userId, following);
        setProfiles(response);
        
      }

      if( userId ) {
          suggestedProfiles(userId);
      }
    }, [userId])
    

    return !profiles ? (
        <ContentLoader 
            speed={2}
            viewBox="0 0 300 192"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            className='mt-0'
        > 
            <rect width="100%" height="12rem" />
        </ContentLoader>
    ) : profiles.length > 0 ? (
        <div className='rounded flex flex-col w-320-px'>
            <div className='text-sm flex items-center justify-between mb-2'>
                <p className='font-bold text-gray-base'>Suggestions for you</p>                
            </div>
            <div className='mt-4 grid gap-5'>
                {profiles.map((profile) => (
                    <SuggestedProfile 
                        key={profile.docId}
                        profileDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                        loggedInUserDocId={loggedInUserDocId}
                    />
                ))}
            </div>
        </div>
    ) : null;
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string,
}