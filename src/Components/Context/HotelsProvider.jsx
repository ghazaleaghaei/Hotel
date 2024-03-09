import { createContext, useContext } from "react"
import { useSearchParams } from "react-router-dom"
import { useFetchData } from "../../Hooks/Exports"

const HotelContext = createContext()

function HotelsProvider({ children }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const destination = searchParams.get("destination")
    const room = JSON.parse(searchParams.get("options"))?.room
    const { isLoading, error, data } = useFetchData(
        "http://localhost:5000/hotels",
        `q=${destination || ""}&accommodates_gte=${room || 1}`
    )
    return <HotelContext.Provider value={{ isLoading, data }}>{children}</HotelContext.Provider>

}
export default HotelsProvider

export function useHotels() {
    return useContext(HotelContext)
}
