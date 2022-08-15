import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { getPhotos, getUserFromFirestoreByUserId } from '../services/firebase';

export default function usePhoto() {
    const [photos, setPhotos] = useState({});
    const { user: { uid: userId='' }} = useContext(UserContext);
    
    useEffect(() => {
        async function getTimelinePhotos() {
            const [{ following }] = await getUserFromFirestoreByUserId(userId);
            let followedUserPhotos = [];

            if(following.length > 0) {
                followedUserPhotos = await getPhotos(userId, following);
            }
            followedUserPhotos = followedUserPhotos.sort((a,b) => b.dataCreated - a.dataCreated)
            setPhotos(followedUserPhotos);
        }

        getTimelinePhotos();
       
    }, [userId])


    return { photos }
}