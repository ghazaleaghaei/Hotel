import { useState } from "react"
import {
    Location,
    Calender,
    Search,
} from "../../Svg/Exports"
import { OptionItems } from "../Exports"

function Header() {
    const [destination, setDestination] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })
    const handlerOptions = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "inc" ? options[name] + 1 : options[name] - 1
            }
        }
        )
    }

    return (
        <>
            <div class="border rounded-lg w-full max-w-7xl mx-auto my-5 px-2 py-3 shadow-md relative">
                <div class="inline-flex w-full overflow-x-auto gap-2 lg:gap-12 items-center lg:justify-center">
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
                    <div class="flex">
                        <Calender class="w-5 aspect-square fill-blue-700" />
                        <div>2023/10/10</div>
                    </div>
                    <div class="h-10 bg-gray-300 p-px" />
                    <div class="flex-none w-fit cursor-pointer">
                        <div 
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {options.adult} adult . {options.children} children . {options.room} room
                        </div>
                    </div>
                    <div class="h-10 bg-gray-300 p-px" />
                    <div>
                        <button class="bg-blue-500 rounded-lg w-8 aspect-square flex justify-center items-center">
                            <Search class="w-5 aspect-square fill-white" />
                        </button>
                    </div>
                </div>
                <OptionItems
                    handlerOptions={handlerOptions}
                    isOpen={isOpen}
                    options={options}
                />
            </div>
        </>
    )
}
export default Header
