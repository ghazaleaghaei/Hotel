import { Link } from "react-router-dom"
import { useBookMark } from "../Context/BookMarkProvider"
import { Loading } from "../Exports"
import ReactCountryFlag from "react-country-flag"

function BookMarkList() {
    const { bookmarks, loading, currentBookMark } = useBookMark()
    if (loading) return <Loading />
    return (
        <>
            <div>
                <h1 class="font-bold text-xl">BookMark List ( {bookmarks.length} ) </h1>
                {bookmarks.map(item =>
                    <Link
                        key={item.id}
                        to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
                        class={`flex items-center gap-4 my-5 hover:scale-95 duration-500 group rounded-lg shadow-md p-3 ${item?.id === currentBookMark?.id && "bg-sky-50"}`}
                    >
                        <ReactCountryFlag
                            svg
                            countryCode={item.countryCode}
                            style={{
                                width: 30,
                                height: 30,
                                objectPosition: "cover"
                            }}
                        />
                        <div>
                            <strong>{item.cityName}</strong>&nbsp;
                            <span>{item.country}</span>
                        </div>
                    </Link>
                )}
            </div>
        </>
    )
}
export default BookMarkList
