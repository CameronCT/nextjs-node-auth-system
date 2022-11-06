import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import Input from './Forms/Input'
import Userbar from './Userbar'
import Link from './Utils/Link';

const Navbar = () => {

    const [ search, setSearch ] = useState<string>('');

    return (
        <div className="bg-gray-100 py-2">
            <div className="tw-container">
                <div className="flex">
                    {/* Logo */}
                    <Link to="/" className="my-auto bg-gradient-to-r from-purple-900 to-purple-800 w-10 h-10 flex flex-col rounded-lg font-bold text-white rounded-lg">
                        <div className="m-auto text-sm">N</div>
                    </Link>

                    {/* Search */}
                    <Input className="w-1/4 my-auto ml-2 mr-auto" type="text" icon={faSearch} name="search" label="Search" value={search} onChange={(v) => setSearch(v)} />

                    {/* User */}
                    <Userbar />
                </div>
            </div>
        </div>
    )
}

export default Navbar
