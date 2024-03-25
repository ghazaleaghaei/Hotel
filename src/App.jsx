import React from "react"
import {
    Route,
    Routes,
} from "react-router-dom"
import {
    Header,
    HotelLayout,
    LocationList,
    Hotels,
    Hotel,
    BookMarkLayout,
    BookMarkList,
    CurrentBookMark,
    AddNewBookMark,
    Login,
} from "./Components/Exports"
import HotelsProvider from "./Components/Context/HotelsProvider"
import BookMarkProvider from "./Components/Context/BookMarkProvider"

function App() {
    return (
        <>
            <BookMarkProvider>
                <HotelsProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<LocationList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/hotels" element={<HotelLayout />}>
                            <Route index element={<Hotels />} />
                            <Route path=":id" element={<Hotel />} />
                        </Route>
                        <Route path="/bookmarks" element={<BookMarkLayout />}>
                            <Route index element={<BookMarkList />} />
                            <Route path=":id" element={<CurrentBookMark />} />
                            <Route path="add" element={<AddNewBookMark />} />
                        </Route>
                    </Routes>
                </HotelsProvider>
            </BookMarkProvider>
        </>
    )
}

export default App
