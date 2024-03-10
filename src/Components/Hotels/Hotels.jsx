import {
    Link,
} from "react-router-dom"
import { Loading } from "../Exports"
import { useHotels } from "../Context/HotelsProvider"

function Hotels() {
    const { isLoading, data, hotel } = useHotels()
    return (
        <>
            {isLoading ? <Loading /> :
                <div>
                    <h1 class="font-bold text-xl">search results ( {data.length} ) </h1>
                    {data.map(item =>
                        <Link
                            key={item.id}
                            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
                            class={`flex items-start gap-4 my-5 hover:scale-95 duration-500 group rounded-lg ${item.id === hotel.id && "bg-sky-50"}`}
                        >
                            <img
                                src={item.picture_url.url}
                                alt={item.name}
                                class="w-[20%] aspect-square rounded-lg object-cover"
                            />
                            <div>
                                <p class="my-1 font-medium group-hover:text-sky-700 duration-500">{item.smart_location}</p>
                                <p class="line-clamp-1 text-gray-500 font-light">{item.name}</p>
                                <p class="my-1">
                                    $&nbsp;{item.price}&nbsp;
                                    <span class="text-gray-500 font-light">night</span>
                                </p>
                            </div>
                        </Link>
                    )}
                </div>}
        </>
    )
}
export default Hotels
