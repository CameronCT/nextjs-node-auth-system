import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Input from './Forms/Input'
import Userbar from './Userbar'

const Navbar = () => {
    return (
        <div className="tw-container border-b py-3 px-6">
            <div className="flex">
                {/* Logo */}
                <div className="my-auto bg-gradient-to-r from-purple-900 to-purple-800 w-10 h-10 flex flex-col rounded-lg font-bold text-white rounded-lg">
                    <div className="m-auto text-xs">NNAS</div>
                </div>

                {/* Search */}
                <Input className="w-1/4 my-auto ml-2 mr-auto" type="text" icon={faSearch} name="search" label="Search" onChange={(v) => console.log(v)} />

                {/* User */}
                <Userbar />
            </div>
        </div>
    )
}

export default Navbar
