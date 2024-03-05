import { useState } from "react"
import {
    Location,
    Calender,
    Search,
} from "../../Svg/Exports"

function Header() {
    const [destination, setDestination] = useState("")
    return (
        <>
            <div class="inline-flex gap-2 border rounded-lg w-full my-5 px-2 py-5 shadow-md items-center justify-start">
                <div class="inline-flex">
                    <Location class="w-5 aspect-square fill-red-700" />
                    <input
                        value={destination}
                        class="outline-none"
                        placeholder="where to go ?"
                        type="text"
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>
                <div class="inline-flex">
                    <Calender class="w-5 aspect-square fill-blue-700" />
                    <div>2023/10/10</div>
                </div>
                <div>
                    <div>1 adult . 2 children . 1 room</div>
                </div>
                <div>
                    <button class="bg-blue-500 rounded-lg w-full aspect-square">
                        <Search class="w-5 aspect-square fill-white" />
                    </button>
                </div>
            </div>
        </>
    )
}
export default Header
