import React from 'react'
import {useGlobalContext} from './context'

const Form = ()=>{
    const {query, setQuery, error} = useGlobalContext()
    return (
        <section className="form-section">
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Search Movies" value={query} onChange={(e) => setQuery(e.target.value)} />
                {error.show ? <div className="error">{error.msg}</div> : null}
            </form>
        </section>
    )
}


export default Form