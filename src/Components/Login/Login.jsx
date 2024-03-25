import { useState } from "react"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandler = (e) => {
        e.preventDefault()
        setEmail("")
        setPassword("")
    }
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
                    class="p-2 rounded-lg outline-none placeholder:text-gray-700 border"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="password"
                    class="p-2 rounded-lg outline-none placeholder:text-gray-700 border"
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
