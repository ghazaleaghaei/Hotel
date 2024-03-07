import { useFetchData } from "../../Hooks/Exports"

function LocationList() {
    const { data, isLoading, error } = useFetchData("http://localhost:5000/hotels", "")
    console.log(data)
    return (
        <>
            <section class="mx-5 md:max-w-7xl 2xl:mx-auto">
                <h1 class="font-bold text-xl">Nearby Location</h1>
                <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 my-5">
                    {data.map((item, index) =>
                        <div
                            class="shadow-md"
                            key={item.id}
                        >
                            <img
                                src={item.picture_url.url}
                                alt={item.name}
                                class="w-full aspect-[3/2] object-cover rounded-lg"
                                loading={`${index < 4 ? "eager" : "lazy"}`}
                            />
                            <p class="mt-4 mb-2 font-medium">{item.smart_location}</p>
                            <p class="line-clamp-1 text-gray-500 font-light">{item.name}</p>
                            <p class="mt-2 mb-4">
                                $&nbsp;{item.price}&nbsp;
                                <span class="text-gray-500 font-light">night</span>
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
export default LocationList
