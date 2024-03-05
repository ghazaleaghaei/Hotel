function OptionItem({
    type,
    options,
    minLimit,
    handlerOptions,
}) {
    return (<>
        <div class="flex mx-5 my-4 gap-4 items-center">
            <span class="me-auto">{type}</span>
            <button
                class="bg-gray-300 rounded-md p-px w-5 aspect-square disabled:bg-gray-400"
                disabled={options[type] <= minLimit}
                onClick={() => handlerOptions(type, "dec")}
            >   -
            </button>
            <span>{options[type]}</span>
            <button
                class="bg-gray-300 rounded-md p-px w-5 aspect-square"
                onClick={() => handlerOptions(type, "inc")}
            >+</button>
        </div>
    </>)
}
export default OptionItem
