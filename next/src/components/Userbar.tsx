import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSessionContext } from '../contexts/Session.context'
import Link from './Utils/Link'

const Userbar = () => {
    const { sessionData, resetSessionData } = useSessionContext()

    return (
        <div className="flex space-x-4">
            {/* Account Settings */}
            <Link to="/account/settings" className="my-auto text-xl mr-2">
                <FontAwesomeIcon icon={faCog} />
            </Link>

            {/* User Name */}
            <div className="my-auto text-right">
                <div className="text-lg font-bold my-auto">{sessionData?.displayName}</div>
                {!sessionData || sessionData?.authName === 'Guest' ? (
                    <Link to="/auth/login" className="flex text-sm font-bold uppercase -mt-0.5 text-blue-500">
                        Sign In
                    </Link>
                ) : (
                    <button type="button" onClick={resetSessionData} className="flex text-sm font-bold -mt-1.5 text-blue-500">
                        Sign Out
                    </button>
                )}
            </div>

            {/* Avatar */}
            <Link to={`/profile/${sessionData?.accountId}`}>
                <img className="my-auto w-12 h-12 rounded-full bg-gray-50 border p-0.5 border-gray-500 hover:border-gray-900 transition ease-in-out duration-300" src={sessionData?.avatarSrc} alt={sessionData?.displayName} />
            </Link>
        </div>
    )
}

export default Userbar
