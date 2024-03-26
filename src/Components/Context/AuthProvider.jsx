import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext()
const initialState = {
    user: null,
    isAuthenticated: false
}
const fakeUser = {
    user: "ghazale",
    email: "ghazale@gmail.com",
    password: "123456"
}

function authReducer(state, action) {
    switch (action.type) {
        case "login": return {
            user: action.payload,
            isAuthenticated: true
        }
        case "logout": return {
            user: null,
            isAuthenticated: false
        }
        default: throw new Error("unknown action")
    }
}

export default function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(authReducer, initialState)
    function login(email, password) {
        console.log(email, password)
        if (email === fakeUser.email && password === fakeUser.password)
            dispatch({ type: "login", payload: fakeUser })
    }
    function logout() {
        dispatch({ type: "logout" })
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    return useContext(AuthContext)
}
