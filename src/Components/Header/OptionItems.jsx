import { useRef } from "react"
import { OptionItem } from "../Exports"
import { useOutsideClick } from "../../Hooks/Exports"

function OptionItems({
    isOpen,
    options,
    handlerOptions,
    setIsOpen,
}) {
    const optionRef = useRef()
    useOutsideClick(optionRef, "dropDown", () => setIsOpen(false))
    return (<>
        <div
            class={`absolute h-fit w-1/2 sm:w-1/4 rounded-lg shadow-md end-16 md:end-36 xl:end-60 bg-white duration-300 z-[1001] ${isOpen ? "top-10" : "-top-40"}`}
            ref={optionRef}
        >
            <OptionItem
                handlerOptions={handlerOptions}
                type="adult"
                options={options}
                minLimit={1}
            />
            <OptionItem
                handlerOptions={handlerOptions}
                type="children"
                options={options}
                minLimit={0}
            />
            <OptionItem
                handlerOptions={handlerOptions}
                type="room"
                options={options}
                minLimit={1}
            />
        </div>
    </>)
}
export default OptionItems
