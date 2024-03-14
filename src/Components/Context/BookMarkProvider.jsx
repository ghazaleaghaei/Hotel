import { createContext, useContext, useEffect, useState } from "react"
import { useFetchData } from "../../Hooks/Exports"
import axios from "axios"

const BookMarkContext = createContext()

function BookMarkProvider({ children }) {
    const [currentBookMark, setCurrentBookMark] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [bookmarks, setBookMarks] = useState([])

    useEffect(() => {
        async function fetchBookMarkList() {
            setLoading(true)
            try {
                const { data } = await axios.get("http://localhost:5000/bookmarks")
                setBookMarks(data)
            } catch (err) {

            } finally {
                setLoading(false)
            }
        }
        fetchBookMarkList()
    }, [])

    async function getCurrentBookMark(id) {
        setLoading(true)
        try {
            const { data } = await axios.get(`http://localhost:5000/bookmarks/${id}`)
            setCurrentBookMark(data)
            setLoading(false)
        } catch (err) {
            setError(error.message)
            setLoading(false)
        }
    }

    async function createBookMark(newBookMark) {
        setLoading(true)
        try {
            const { data } = await axios.post("http://localhost:5000/bookmarks", newBookMark)
            setBookMarks((prev) => [...prev, data])

        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    return (
        <BookMarkContext.Provider
            value={{
                bookmarks,
                error,
                currentBookMark,
                loading,
                getCurrentBookMark,
                createBookMark,
            }}
        >
            {children}
        </BookMarkContext.Provider>
    )

}
export default BookMarkProvider

export function useBookMark() {
    return useContext(BookMarkContext)
}
