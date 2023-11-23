import axios from 'axios'
import URL from '../links/links.json'
import {useState} from 'react'
import SearchResult from './SearchResult'

function SearchBar() {
const [searchOutput,setSearchOutput] = useState(null)
const search=(e)=>{
    e.preventDefault()
    const searchInput=e.target.search.value
    axios.get(`${URL.search}?input=${searchInput}`)
    .then(response=>{
    console.log(response.data)
    setSearchOutput(response.data)
})



}

  return (
    <div>

   <form onSubmit={search}>

      <input name='search' placeholder='search for Department/Doctor/General practice'/>
      <button >Search</button>
   </form>
   
    {searchOutput ? <SearchResult searchOutput={searchOutput}/>  :<></>}
    </div>
  );
}

export default SearchBar;
