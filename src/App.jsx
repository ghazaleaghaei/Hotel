import React from "react"
import {
    Header,
    HotelLayout,
    LocationList,
    Hotels,
} from "./Components/Exports"
import { Route, Routes } from "react-router-dom"
import HotelsProvider from "./Components/Context/HotelsProvider"

function App() {
    return (
        <>
            <HotelsProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<LocationList />} />
                    <Route path="/hotels" element={<HotelLayout />}>
                        <Route index element={<Hotels />} />
                        <Route path=":id" element={<div>hotel</div>} />
                    </Route>
                </Routes>
            </HotelsProvider>
        </>
    )
}

export default App
