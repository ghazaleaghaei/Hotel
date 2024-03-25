import { useState } from "react"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import {
    Location,
    Calender,
    Search,
} from "../../Svg/Exports"
import {
    BookMarkList,
    Login,
    OptionItems,
} from "../Exports"
import {
    Link,
    createSearchParams,
    useNavigate,
    useSearchParams
} from "react-router-dom";


function Header() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [destination, setDestination] = useState(searchParams.get("destination") || "")
    const [isOpen, setIsOpen] = useState(false)
    const [openDate, setOpenDate] = useState(false)
    const navigate = useNavigate()
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ])
    const handlerOptions = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "inc" ? options[name] + 1 : options[name] - 1
            }
        }
        )
    }

    const searchHandler = () => {
        const encodedParams = createSearchParams({
            date: JSON.stringify(date),
            destination,
            options: JSON.stringify(options)
        })
        navigate({
            pathname: "/hotels",
            search: encodedParams.toString()
        })
    }

    return (
        <>
            <section class="border rounded-lg w-[95%] max-w-7xl mx-auto my-5 px-2 py-3 shadow-md relative">
                <div class="flex flex-nowrap w-full overflow-x-auto gap-2 lg:gap-10 items-center lg:justify-center">
                    <Link to="/bookmarks">
                        bookmarks
                    </Link>
                    <div class="flex">
                        <Location class="w-5 aspect-square fill-red-700" />
                        <input
                            value={destination}
                            class="outline-none"
                            placeholder="where to go ?"
                            type="text"
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>
                    <div class="h-10 bg-gray-300 p-px" />
                    <div
                        className="date flex flex-none"
                        onClick={() => setOpenDate(!openDate)}
                    >
                        <Calender class="w-5 aspect-square fill-blue-700" />
                        <div>
                            {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}
                        </div>

                    </div>
                    <div class="h-10 bg-gray-300 p-px" />
                    <div class="flex-none cursor-pointer">
                        <div
                            className="dropDown"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {options.adult} adult . {options.children} children . {options.room} room
                        </div>
                    </div>
                    <div class="h-10 bg-gray-300 p-px" />
                    <div>
                        <button
                            onClick={searchHandler}
                            class="bg-blue-500 rounded-lg w-8 aspect-square flex justify-center items-center"
                        >
                            <Search class="w-5 aspect-square fill-white" />
                        </button>
                    </div>
                    <Link to="/login">
                        login
                    </Link>
                </div>
                <OptionItems
                    handlerOptions={handlerOptions}
                    isOpen={isOpen}
                    options={options}
                    setIsOpen={setIsOpen}
                />

            </section>
            {openDate &&
                <DateRange
                    ranges={date}
                    onChange={(item) => setDate([item.selection])}
                    className="absolute mx-3 sm:end-[10%] md:end-[20%] lg:end-[36%] z-[1001]"
                    minDate={new Date()}
                    moveRangeOnFirstSelection={true}
                />
            }
        </>
    )
}
export default Header
