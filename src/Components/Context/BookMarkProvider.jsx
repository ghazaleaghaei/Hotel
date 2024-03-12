import { createContext, useContext, useState } from "react"
import { useFetchData } from "../../Hooks/Exports"
import axios from "axios"

const BookMarkContext = createContext()

function BookMarkProvider({ children }) {
    const [currentBookMark, setCurrentBookMark] = useState(null)
    const [currentBookMarkLoading, setCurrentBookMarkLoading] = useState(false)
    const [currentBookMarkError, setCurrentBookMarkError] = useState("")

    const { isLoading, error, data: bookmarks } = useFetchData("http://localhost:5000/bookmarks")

    async function getCurrentBookMark(id) {
        setCurrentBookMarkLoading(true)
        try {
            const { data } = await axios.get(`http://localhost:5000/bookmarks/${id}`)
            setCurrentBookMark(data)
            setCurrentBookMarkLoading(false)
        } catch (error) {
            setCurrentBookMarkError(error.message)
            setCurrentBookMarkLoading(false)
        }
    }

    return (
        <BookMarkContext.Provider
            value={{
                isLoading,
                bookmarks,
                error,
                currentBookMark,
                currentBookMarkError,
                currentBookMarkLoading,
                getCurrentBookMark
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
