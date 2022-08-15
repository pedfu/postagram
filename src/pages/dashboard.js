import { useEffect, useState } from "react"
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import PostPopup from "../components/header/add-post";
import useUser from "../hooks/use-user";

export default function Dashboard() {

  const [scrollBlocked, setScrollBlocked] = useState(false);    
  const [ postPopup, setPostPopup ] = useState(false);
  const [ profilePicture, setProfilePicture ] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

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
      setProfilePicture(user.imageSrc ? user.imageSrc : '/images/avatars/default.png');
    }, [user, user.image])

    useEffect(() => {
        document.title = 'Postagram';
        if(window.location.pathname !== '/') {
          window.location.pathname = '/'
        }
    }, [])

  return (
    <div className="bg-gray-background">
        <Header setPostPopup={setPostPopup} postPopup={postPopup} />
        {postPopup && (
          <PostPopup user={user} setPostPopup={setPostPopup} />
        )}
        <div className={`grid grid-cols-2 gap-32-px justify-center mx-auto max-w-screen-lg ${scrollBlocked ? '' : ''} sm:grid-cols-main`}>
          <div className="col-span-2 flex justify-center md:mx-10 sm:mx-8 max-w-screen-lg">
            <Timeline setScrollBlocked={setScrollBlocked} />
            <Sidebar profilePic={profilePicture} /> 
          </div>
        </div>
    </div>
  )
}
