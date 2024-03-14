import ReactCountryFlag from "react-country-flag"
import { useBookMark } from "../Context/BookMarkProvider"
import { Loading } from "../Exports"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "../../Svg/Exports"

function CurrentBookMark() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { currentBookMark, loading, getCurrentBookMark } = useBookMark()
    useEffect(() => {
        getCurrentBookMark(id)
    }, [id])
    if (loading || !currentBookMark) return <Loading />
    return (
        <>
            <div>
                <button
                    class="px-2 py-1 bg-sky-100 border rounded-lg border-sky-400 hover:scale-105 flex gap-2 items-center justify-center"
                    onClick={() => { navigate(-1) }}>
                    <ArrowLeft class="w-5 aspect-square" />
                    back
                </button>
                <div class="my-5">
                    <ReactCountryFlag
                        svg
                        countryCode={currentBookMark.countryCode}
                        style={{
                            width: 30,
                            height: 30,
                            objectPosition: "cover"
                        }}
                    />
                    &nbsp;
                    <strong>{currentBookMark.cityName}</strong>
                    &nbsp;
                    <span>{currentBookMark.country}</span>
                </div>
            </div>
        </>
    )
}
export default CurrentBookMark
