import {useFetchData} from "../../Hooks/Exports"

function LocationList() {
    const { data, isLoading, error } = useFetchData("http://localhost:5000/hotels","")
    console.log(data)
    return (
        <>
        </>
    )
}
export default LocationList
