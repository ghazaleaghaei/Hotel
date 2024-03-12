import { Outlet } from "react-router-dom"
import { Map } from "../Exports"
import { useBookMark } from "../Context/BookMarkProvider"

function BookMarkLayout() {
    const { bookmarks } = useBookMark()
    return (
        <section class="max-w-7xl 2xl:mx-auto mx-5 grid sm:grid-cols-2 gap-10 my-8">
            <Outlet />
            <Map marker={bookmarks} />
        </section>
    )
}
export default BookMarkLayout
