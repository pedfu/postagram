import useUser from '../../hooks/use-user';
import Suggestions from "./suggestions";
import User from "./user";

export default function Sidebar({ profilePic }) {
    const { user: { docId, fullName, username, userId, following, imageSrc } } = useUser();
    const footerOptions = ['About', 'Help', 'Jobs', 'Privacy', 'Terms', 'Localization', 'Language', 'Random', 'Random', 'Random', 'Random', 'Random']
    
    return (
        <div className='p-4 hidden lg:block box-border min-w-max w-320-px'>
            <User username={username} fullName={fullName} profilePic={profilePic} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />

            <div if="mainFooter" className="mt-8">
                <div className='max-w-xs flex flex-wrap'>
                    {footerOptions.map((option, id) => (
                        <span key={`option-${id}`} className='text-gray-footer text-xs cursor-pointer mr-1'>{option}{id < footerOptions.length - 1 ? ' • ' : ''}</span>
                    ))}
                </div>
                <div className='mt-4'>
                    <p className='text-gray-footer text-sm'>© 2022 POSTAGRAM FAKE FROM <a href="https://github.com/pedfu" target="_blank" className='underline'>PEDFU</a></p>
                </div>
            </div>
        </div>
    )
}