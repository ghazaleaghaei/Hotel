import { useEffect } from "react"

function useOutsideClick(ref, exception, cb) {
    useEffect(() => {
        function handlerOutsideClick(event) {
            if (
                ref.current &&
                !ref.current.contains(event.target) &&
                event.target.className !== exception
            ) {
                cb()
            }
        }
        document.addEventListener("mousedown", handlerOutsideClick)
        return () => {
            document.removeEventListener("mousedown", handlerOutsideClick)
        }
    }, [ref, cb])
}
export default useOutsideClick
