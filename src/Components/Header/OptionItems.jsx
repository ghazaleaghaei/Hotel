import { OptionItem } from "../Exports"

function OptionItems({
    isOpen,
    options,
    handlerOptions,
}) {
    return (<>
        <div class={`absolute h-fit w-1/2 sm:w-1/4 rounded-lg shadow-md end-16 md:end-36 xl:end-60 bg-white duration-300 ${isOpen ? "top-10" : "-top-40"}`}>
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
