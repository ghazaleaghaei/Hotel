import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react"
import axios from "axios"

const BookMarkContext = createContext()
const initialState = {
    currentBookMark: null,
    loading: false,
    bookmarks: [],
    error: "",
}

function bookmarkReducer(state, action) {
    switch (action.type) {
        case "loading": return {
            ...state,
            loading: true
        }
        case "bookmarksLoaded": return {
            ...state,
            loading: false,
            bookmarks: action.payload
        }
        case "bookmarkLoaded": return {
            ...state,
            currentBookMark: action.payload,
            loading: false
        }
        case "createBookmark": return {
            ...state,
            loading: false,
            bookmarks: [...state.bookmarks, action.payload],
            currentBookMark: action.payload
        }
        case "deleteBookmark": return {
            ...state,
            loading: false,
            bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
            currentBookMark: null
        }
        case "error": return {
            ...state,
            loading: false,
            error: action.payload
        }
        default:
            throw new Error("unknown action")
    }

}

function BookMarkProvider({ children }) {

    const [{ currentBookMark, loading, bookmarks, error }, dispatch] = useReducer(bookmarkReducer, initialState)

    useEffect(() => {
        async function fetchBookMarkList() {
            dispatch({ type: "loading" })
            try {
                const { data } = await axios.get("http://localhost:5000/bookmarks")
                dispatch({ type: "bookmarksLoaded", payload: data })
            } catch (err) {
                dispatch({ type: "error", payload: err.message })
            }
        }
        fetchBookMarkList()
    }, [])

    async function getCurrentBookMark(id) {
        if (Number(id) === currentBookMark?.id) return
        dispatch({ type: "loading" })
        try {
            const { data } = await axios.get(`http://localhost:5000/bookmarks/${id}`)
            dispatch({ type: "bookmarkLoaded", payload: data })
        } catch (err) {
            dispatch({ type: "error", payload: err.message })
        }
    }

    async function createBookMark(newBookMark) {
        dispatch({ type: "loading" })
        try {
            const { data } = await axios.post("http://localhost:5000/bookmarks", newBookMark)
            // setBookMarks((prev) => [...prev, data])
            dispatch({ type: "createBookmark", payload: data })

        } catch (err) {
            dispatch({ type: "error", payload: err.message })
        }
    }

    async function deleteBookMark(id) {
        dispatch({ type: "loading" })
        try {
            await axios.delete(`http://localhost:5000/bookmarks/${id}`)
            // setBookMarks((prev) => prev.filter((item) => item.id !== id))
            dispatch({ type: "deleteBookmark", payload: id })

        } catch (err) {
            dispatch({ type: "error", payload: err.message })
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
                deleteBookMark,
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
