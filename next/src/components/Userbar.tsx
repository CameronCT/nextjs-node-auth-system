import { useSessionContext } from "../contexts/Session.context";
import Link from "./Utils/Link";

const Userbar = () => {

    const { sessionData, resetSessionData } = useSessionContext();

    return (
        <div className="flex space-x-4">
            {/* User Name */}
            <div className="my-auto text-right">
                <div className="text-lg font-bold my-auto">
                    {sessionData?.displayName}
                </div>
                {(!sessionData || sessionData?.authName === "Guest") ? (
                    <Link to="/auth/login" className="flex text-sm font-bold uppercase -mt-0.5 text-blue-500">
                        Sign In
                    </Link>
                ) : (
                    <button type="button" onClick={resetSessionData} className="flex text-sm font-bold uppercase -mt-0.5 text-blue-500">
                        Sign Out
                    </button>
                )}
            </div>

            {/* Avatar */}
            <img 
                className="my-auto w-12 h-12 rounded-full bg-gray-50 border p-0.5 border-gray-500 hover:border-gray-900 transition ease-in-out duration-300" 
                src={sessionData?.avatarSrc}
            />
        </div>
    )
}

export default Userbar;