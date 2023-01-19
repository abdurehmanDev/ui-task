import React from 'react'
import SearchIcon from '../public/Icons/SearchIcon'

export default function SearchBar(props:any) {
  return (
    <div className='search-block'>
    <div className={props.darkMode? "search-bar dark-mode-container" :  "search-bar"}>
    <SearchIcon darkMode={props.darkMode}/>
    <input placeholder='Search a country.....' className={props.darkMode? "form-control dark-mode-container" :  "form-control"} type="text"/>
  </div>
  <div className="filter">
  
  <select className={props.darkMode? 'form-control select-bar dark-mode-container' : 'form-control select-bar' } onChange={(e) => props.filterByRegion(e.target.value)}>
    <option value="default-value">Filter by Region</option>
    <option value='Americas'>Americas</option>
    <option value='Asia'>Asia</option>
    <option value='Africa'>Africa</option>
    <option value='Europe'>Europe</option>
    <option value='Oceania'>Oceania</option>
    <option value='Polar'>Polar</option>
  </select>
</div>

 </div>
  )
}
