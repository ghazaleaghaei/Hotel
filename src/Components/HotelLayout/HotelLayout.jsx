import { Outlet } from "react-router-dom"
import { Map } from "../Exports"

function HotelLayout() {
    return (
        <>
            <section class="max-w-7xl 2xl:mx-auto mx-5 grid sm:grid-cols-2 gap-10 my-8">
                <Outlet />
                <Map />
            </section>
        </>
    )
}
export default HotelLayout
