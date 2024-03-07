import React from "react"
import {
    Header,
    HotelLayout,
    LocationList,
} from "./Components/Exports"
import { Route, Routes } from "react-router-dom"

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<LocationList />} />
                <Route path="/hotels" element={<HotelLayout />}>
                    <Route index element={<div>hotels</div>} />
                    <Route path=":id" element={<div>hotel</div>} />
                </Route>
            </Routes>
        </>
    )
}

export default App
