import { createContext, useContext, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useFetchData } from "../../Hooks/Exports"
import axios from "axios"

const HotelContext = createContext()

function HotelsProvider({ children }) {
    const [hotel, setHotel] = useState(null)
    const [hotelLoading, setHotelLoading] = useState(false)
    const [hotelError, setHotelError] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()
    const destination = searchParams.get("destination")
    const room = JSON.parse(searchParams.get("options"))?.room

    const { isLoading, error, data } = useFetchData(
        "http://localhost:5000/hotels",
        `q=${destination || ""}&accommodates_gte=${room || 1}`
    )

    async function getHotel(id) {
        setHotelLoading(true)
        try {
            const { data: hotel } = await axios.get(`http://localhost:5000/hotels/${id}`)
            setHotel(hotel)
            setHotelLoading(false)
        } catch (error) {
            setHotelError(error.message)
            setHotelLoading(false)
        }
    }

    return (
        <HotelContext.Provider
            value={{ isLoading, data, error, hotel, hotelError, hotelLoading, getHotel }}
        >
            {children}
        </HotelContext.Provider>
    )

}
export default HotelsProvider

export function useHotels() {
    return useContext(HotelContext)
}
