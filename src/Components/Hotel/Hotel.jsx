import { useParams } from "react-router-dom"
import { Loading } from "../Exports"
import { useEffect } from "react"
import { useHotels } from "../Context/HotelsProvider"

function Hotel() {
    const { id } = useParams()
    const { getHotel, hotel: currentHotel, hotelLoading, hotelError } = useHotels()
    useEffect(() => {
        getHotel(id)
    }, [id])
    if (hotelLoading || !currentHotel) return <Loading />
    return (
        <div>
            <div class="my-4">
                <h1 class="font-bold text-xl">{currentHotel?.name}</h1>
                <p class="font-light my-2">
                    {currentHotel?.number_of_reviews} reviews &bull; {currentHotel?.smart_location}
                </p>
                <img
                    src={currentHotel?.xl_picture_url}
                    alt={currentHotel?.name}
                    class="w-full aspect-[3/2] object-cover rounded-lg my-4"
                />
            </div>
        </div>
    )

}
export default Hotel
