import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "../../Svg/Exports"
import { useUrlLocation } from "../../Hooks/Exports"

function AddNewBookMark() {
    const navigate = useNavigate()
    const [lat, lng] = useUrlLocation()
    return (
        <div class="sm:w-2/3">
            <h1 class="font-bold text-xl">BookMark New Location </h1>
            <form class="flex flex-col my-5 gap-5">
                <input
                    class="outline-none border rounded-lg px-2 py-1 border-sky-500 placeholder:text-gray-500"
                    placeholder="city name"
                    type="text"
                    name="city"
                    id="city"
                />
                <input
                    class="outline-none border rounded-lg px-2 py-1 border-sky-500 placeholder:text-gray-500"
                    placeholder="country"
                    type="text"
                    name="country"
                    id="country"
                />
                <div class="inline-flex justify-space">
                    <button
                        class="border border-violet-700 rounded-lg px-2 py-1 inline-flex items-center justify-center gap-2 hover:scale-105 duration-300"
                        onClick={(e) => { e.preventDefault(), navigate(-1) }}>
                        <ArrowLeft class="w-5 aspect-square" />
                        back
                    </button>
                    <button class="ms-auto bg-purple-500 text-white px-2 py-1 rounded-lg hover:scale-105 duration-300" >
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}
export default AddNewBookMark
