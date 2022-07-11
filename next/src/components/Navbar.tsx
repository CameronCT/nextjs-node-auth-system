import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Input from "./Forms/Input";

const Navbar = () => {
    return (
        <div className="border-b p-3">
            <div className="flex space-x-4">
                {/* Logo */}
                <div className="bg-gradient-to-r from-purple-900 to-purple-800 w-10 h-10 flex flex-col rounded-lg font-bold text-white rounded-lg">
                    <div className="m-auto text-xs">NNAS</div>
                </div>

                {/* Search */}
                <Input className="w-1/4" type="text" icon={faSearch} name="search" label="Search" onChange={(v) => console.log(v)} />

                {/* User */}
                <div className="flex">

                </div>
            </div>
        </div>
    )
}

export default Navbar;