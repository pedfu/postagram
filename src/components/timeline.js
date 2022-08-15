import usePhoto from "../hooks/use-photos";
import ContentLoader from "react-content-loader";
import Post from "./post";
import Popup from "./singlepost/popup";

export default function Timeline({setScrollBlocked}) {
    const { photos: posts } = usePhoto();
    // const scrollAmount = 400;
    const currentScrollPos = 0;

    return (
        <div className="container col-span-2 lg:col-span-1 mr-8 flex flex-col items-center w-470-px max-w-screen-lg">
            <div className="rounded-lg col-span-4 border bg-white border-gray-primary mb-3 w-470-px sm:w-470-px pt-2 pr-0 flex justify-between relative min-h-117-px h-117-px ">
                <div className="flex overflow-x-hidden absolute">
                    {posts.length > 0 ? posts.map((post, id) => (
                        id < 10 ? (
                            <div className="flex flex-col items-center p-1.5 " key={`post${post}${id}`}>
                                <div className="bg-gradient-to-br from-pink-logo to-yellow-logo rounded-full p-0.5 cursor-pointer" key={`stories${post.username}-${post.docId}`}>
                                    <img 
                                        src={`/images/avatars/${post.username}.jpg`} className='rounded-full min-w-62-px min-h-62-px w-62-px h-62-px border-2 border-white'                           
                                        onError={(e) => {e.target.src='/images/avatars/default.png';e.target.onerror='';}}
                                    />
                                </div>
                                <p className="text-xs mt-1">{post.username}</p>
                            </div>
                        ) : null
                    )) : null
                    }
                    <div className="flex flex-col items-center p-1.5">
                        <div className="bg-gradient-to-br from-pink-logo to-yellow-logo rounded-full p-0.5 cursor-pointer" >
                            <img 
                                src={`/images/avatars/a.jpg`} className='min-w-62-px min-h-62-px w-62-px h-62-px rounded-full border-2 border-white'                           
                                onError={(e) => {e.target.src='/images/avatars/default.png';e.target.onerror='';}}
                            />
                        </div>
                        <p className="text-xs mt-1">uername3</p>
                    </div>
                            
                    <button className="btn-scroll rounded-full absolute left-0 top-1/3 bg-white h-6 w-6 flex justify-center items-center" id="btn-scroll-left"
                        onClick={(e) => {
                            console.log(e)
                        }}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="btn-scroll rounded-full absolute right-4 top-1/3 bg-white h-6 w-6 flex justify-center items-center" id="btn-scroll-right">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
            {!posts ? (
                <div>
                    <ContentLoader 
                        className=""
                        speed={2}
                        width={470}
                        height={460}
                        viewBox="0 0 470 460"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <circle cx="35" cy="31" r="18" /> 
                        {/* <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />  */}
                        <rect x="65" y="24" rx="2" ry="2" width="140" height="16" /> 
                        <rect x="0" y="66" rx="2" ry="2" width="470" height="400" />
                    </ContentLoader>
                    <ContentLoader 
                        className=""
                        speed={2}
                        width={470}
                        height={460}
                        viewBox="0 0 470 460"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <circle cx="35" cy="31" r="18" /> 
                        {/* <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />  */}
                        <rect x="65" y="24" rx="2" ry="2" width="140" height="16" /> 
                        <rect x="0" y="66" rx="2" ry="2" width="470" height="400" />
                    </ContentLoader>
                </div>
            ) : posts.length > 0 ? (
                posts.map((post) => (
                    <Post key={post.docId} post={post} setScrollBlocked={setScrollBlocked}/>
                ))
            ) : (
                <div>sem post</div>
            )}            
        </div>
    )
}
