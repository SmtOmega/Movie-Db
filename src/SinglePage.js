import { useEffect, useState } from 'react'
import { useParams, Link} from 'react-router-dom'
import {API_ENDPOINT} from './context'


const SinglePage = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] =  useState({})
    const [error, setError] = useState({show: false, msg: ""})


    const fetchMovie = async (url) => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const data = await response.json()
            if(data.Response === "False"){
                setError({show: true, msg: data.Error})
            }
            else {
                setMovie(data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchMovie(`${API_ENDPOINT}&i=${id}`)
    }, [id])

    if(loading){
        return <h2 className="loading">Loading...</h2>
    }

    if(error.show){
        return(
            <div className="error-container">
                <h2 className="error">{error.msg}</h2>
                <Link to="/" className="btn">
                    Back to Movies
                </Link>
            </div>
        )
    }

    const {Poster: poster, Title: title, Plot: plot, Year: year} = movie
    return (
        <section className="single-movie">
            <img src={poster} alt={title} />
            <div>
                <h2>{title}</h2>
                <p>{plot}</p>
                <h4>{year}</h4>
                <Link to ="/" className="btn">
                    Back Home
                </Link>
            </div>
        </section>
    )
}

export default SinglePage