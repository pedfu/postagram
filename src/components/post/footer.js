import { Link } from "react-router-dom";

export default function Footer({username, caption}) {
    return (
        <div className="p-4 pt-2 pb-0 mb-1">
            <span className="mr-1 font-bold text-sm hover:underline"><Link to={`/p/${username}`}>{username}</Link></span>

            {caption.length > 120 ? (
                <span className={`text-sm id-${caption}-${username}`}>{caption.slice(0,120)}... <span className='text-gray-light cursor-pointer select-none' 
                onClick={(e) => {
                    const elements = document.getElementsByClassName(`id-${caption}-${username}`)
                    const elementsArray = [...elements]
                    elementsArray.map(el => {
                        if(el.nodeType == 1) {
                            el.innerText = caption
                        }
                    })
                    e.target.innerText = '';
                }}
                >see more</span></span>                            
            ) : (
                <span className='text-sm'>{caption}</span>
            )}
        </div>
    )
}