import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import {getUserFromFirestoreByUserId} from '../services/firebase';

export default function useUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getUserObjByUserId() {
            const [response] = await getUserFromFirestoreByUserId(user.uid);
            setActiveUser(response);
        }

        if(user?.uid) {
            getUserObjByUserId();
        }

    }, [user])

    // return { user: {...activeUser, docId: user.uid }}
    return { user: activeUser }
}