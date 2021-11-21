import Image from "next/image";
import { 
        SearchIcon,
        GlobeAltIcon,
        MenuIcon,
        UserCircleIcon,
        UsersIcon} from '@heroicons/react/solid'
import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/dist/client/router";


function Header({placeholder}) {
    // using array destructuring 
    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router =useRouter();

    // create configuration for date range picker
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    // create handleSelect function using arrow function,
    // the event that we handle is using 'ranges', which enable to map start and end date appropiately
    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);

    }
    
    // create resetInput function that wipes out the search inputed text by user
    const resetInput = () => {
        // set the search input to its first value, which is blank
        setSearchInput('')
    }

    // create search function to redirect page into search results
    const search = () => {
        router.push({
            pathname: "/search",
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests,
            }
        })
    }


    return (
        <header className="sticky top-0 z-50 grid 
        grid-cols-3 bg-white shadow-md p-5 md:px-10">
            {/* left */}
            <div onClick={() => router.push("/")} className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image
                src='https://links.papareact.com/qd3' 
                layout="fill"
                // add decoration to make it well design
                objectFit="contain"
                objectPosition="left"
                 />
            </div>

            {/* Middle - Search*/}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm ">
                <input
                value={searchInput}
                // to allow user input on the search bar
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400" type="text" placeholder={placeholder || "Start your search"}/>
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 
                text-white rounded-full p-2 cursor-pointer md:mx-2"
                />
            </div>

            {/* Right */}
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 "/>

                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6 cursor-pointer"/>
                    <UserCircleIcon className="h-6 cursor-pointer"/>
                </div>
            </div>

            {/* only show the calendar card if the search input has a value */}
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto mt-5">
                    <DateRangePicker 
                    ranges={[selectionRange]}
                    // setup the attribute
                    minDate = {new Date()}
                    rangeColors={["#FD5861"]}
                    onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                        <UsersIcon className="h-5"/>
                        <input 
                        value={noOfGuests}
                        onChange={e => setNoOfGuests(e.target.value)}
                        type="number"
                        min={1}
                        className="w-12 pl-2 text-lg outline-none text-red-400"/>
                    </div>
                    <div className="flex">
                        <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button>
                        <button onClick={search} className="flex-grow text-red-400">Search</button>
                    </div>
                </div>
            )}

        </header>
    )
}


export default Header
