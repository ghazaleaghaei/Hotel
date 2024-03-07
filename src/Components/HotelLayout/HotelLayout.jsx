import { Outlet } from "react-router-dom"

function HotelLayout() {
    return (
        <>
            <section class="max-w-7xl 2xl:mx-auto mx-5 grid grid-cols-2">
                <div><Outlet /></div>
                <div>map</div>
            </section>
        </>
    )
}
export default HotelLayout
