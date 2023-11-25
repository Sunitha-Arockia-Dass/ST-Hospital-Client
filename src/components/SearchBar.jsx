import axios from 'axios'
import URL from '../links/links.json'
import { useState } from 'react'
import SearchResult from './SearchResult'

function SearchBar() {
  const [searchOutput, setSearchOutput] = useState(null)
  const search = (e) => {
    e.preventDefault()
    const searchInput = e.target.search.value
    axios.get(`${URL.search}?input=${searchInput}`)
      .then(response => {
        console.log(response.data)
        setSearchOutput(response.data)
      })



  }

  return (    
    <div className='search-bar container full'>    
      <form onSubmit={search}>
        <input name='search' placeholder="Search Department's, Doctor's or General practicien's name"/>
        <button className="submit" type="submit">
        <svg width="256px" height="256px" viewBox="0 0 20.00 20.00" fill="white" transform="matrix(-1, 0, 0, 1, 0, 0)"><path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"></path></svg>
        </button>
      </form>

      {searchOutput ? <SearchResult searchOutput={searchOutput} setSearchOutput={setSearchOutput} /> : <></>}
    </div>
  )
}

export default SearchBar
