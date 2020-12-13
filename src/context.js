import React, { useContext, useEffect, useState } from "react"

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

const AppContext = React.createContext()

export const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({show: false, msg: ""})
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState('batman')

    const fetchMovies = async (url) => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const data = await response.json()
            
            if(data.Response === "True"){
                setMovies(data.Search)
                setError({show: false, msg: ''})
                setLoading(false)
            }
            else {
                setError({show:true, msg: data.Error})
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchMovies(`${API_ENDPOINT}&s=${query}`)
    }, [query])
    return <AppContext.Provider value={
        {
            movies,
            error,
            query,
            setQuery,
            loading
        }
    }>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}