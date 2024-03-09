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

function Map() {
    const { isLoading, data } = useHotels()
    const [center, setCenter] = useState([52, -3])
    const [searchParams, setSearchParams] = useSearchParams()
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    useEffect(() => {
        if (lat && lng) setCenter([lat, lng])
    }, [lat, lng])
    return (
        <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: 536 }}
        >
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
