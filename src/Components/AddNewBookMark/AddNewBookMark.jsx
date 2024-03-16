import {
    useEffect,
    useState
} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ArrowLeft } from "../../Svg/Exports"
import { useUrlLocation } from "../../Hooks/Exports"
import { Loading } from "../Exports"
import ReactCountryFlag from "react-country-flag"
import { useBookMark } from "../Context/BookMarkProvider"

function AddNewBookMark() {
    const navigate = useNavigate()
    const [lat, lng] = useUrlLocation()
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { createBookMark } = useBookMark()

    useEffect(() => {
        if (!lat || !lng) return;
        async function fetchLocationData() {
            setError("")
            setLoading(true)
            try {
                const { data } = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
                console.log(data)
                if (!data.countryCode)
                    throw new Error("this location is not a city! please click somewhere else")
                setCity(data.city || data.locality || "")
                setCountry(data.countryName)
                setCountryCode(data.countryCode)
            } catch (err) {
                setError(err.message)

            } finally {
                setLoading(false)
            }
        }
        fetchLocationData()
    }, [lat, lng])

    const handelSubmit = async (e) => {
        e.preventDefault()
        if (!city || !country) return
        const newBookMark = {
            cityName: city,
            country,
            countryCode,
            latitude: lat,
            longitude: lng,
            host_location: city + "" + country,
        }
        await createBookMark(newBookMark)
        navigate("/bookmarks")
    }

    if (loading) return <Loading />
    if (error) return <p>{error}</p>
    return (
        <div class="sm:w-2/3">
            <h1 class="font-bold text-xl">BookMark New Location </h1>
            <form
                onSubmit={handelSubmit}
                class="flex flex-col my-5 gap-5"
            >
                <input
                    class="outline-none border rounded-lg px-2 py-1 border-sky-500 placeholder:text-gray-500"
                    placeholder="city name"
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <div
                    class=" border rounded-lg px-2 py-1 border-sky-500 inline-flex"
                >
                    <input
                        class="w-full outline-none placeholder:text-gray-500"
                        placeholder="country"
                        type="text"
                        name="country"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    {countryCode && <ReactCountryFlag
                        svg
                        countryCode={countryCode}
                        style={{
                            width: 30,
                            height: 30,
                            objectPosition: "cover"
                        }}
                    />}
                </div>
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
