import {
    useState,
    useEffect
} from "react"
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
} from "react-leaflet"
import { useHotels } from "../Context/HotelsProvider"
import { useSearchParams } from "react-router-dom"
import { useGeoLocation } from "../../Hooks/Exports"

function Map() {
    const { isLoading, data } = useHotels()
    const [center, setCenter] = useState([52, -3])
    const [searchParams, setSearchParams] = useSearchParams()
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const {
        isLoading: isLoadingPosition,
        position: locationPosition,
        getPosition
    } = useGeoLocation()
    useEffect(() => {
        if (lat && lng) setCenter([lat, lng])
    }, [lat, lng])
    useEffect(
        () => {
            if (locationPosition?.lat && locationPosition?.lng) {
                setCenter([locationPosition.lat, locationPosition.lng])
            }
        }, [locationPosition]
    )
    return (
        <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: 536, borderRadius: 10 }}
        >
            <button
                onClick={getPosition}
                class="bg-indigo-600 shadow-lg shadow-indigo-700/50 font-bold text-white absolute bottom-0 z-[1000] m-5 rounded-lg px-2 py-1 hover:scale-105 duration-300"
            >
                {isLoadingPosition ? "Loading..." : "use you location"}
            </button>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            <ChangeCenter position={center} />
            {data?.map(item =>
                <Marker
                    key={item?.id}
                    position={[item?.latitude, item?.longitude]}>
                    <Popup>
                        {item?.host_location}
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    )
}
export default Map

function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position)
    return null
}
