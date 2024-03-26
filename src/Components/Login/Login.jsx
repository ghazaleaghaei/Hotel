import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthProvider"

function Login() {
    const [email, setEmail] = useState("ghazale@gmail.com")
    const [password, setPassword] = useState("123456")
    const { user, login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        if (email && password) login(email, password)
    }
    console.log(user)
    useEffect(() => {
        if (isAuthenticated) navigate("/", { replace: true })
    }, [isAuthenticated, navigate])
    return (
        <>
            <form
                onSubmit={submitHandler}
                class="border rounded-lg max-w-xs sm:max-w-sm mx-auto flex flex-col p-3 gap-4">
                <strong class="text-lg">Login</strong>
                <input
                    type="text"
                    value={email}
                    placeholder="email"
                    class="p-2 rounded-lg outline-none placeholder:text-gray-500 border"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="password"
                    class="p-2 rounded-lg outline-none placeholder:text-gray-500 border"
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <button
                    class="bg-indigo-700 text-white p-2 rounded-lg hover:bg-blue-600 duration-300">
                    login
                </button>
            </form>
        </>
    )
}
export default Login
