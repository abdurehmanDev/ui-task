import React, { useState } from 'react'
import MoonIcon from '../public/Icons/MoonIcon'
import SunIcon from '../public/Icons/SunIcon';


export default function Header(props: any) {



// const darkModeTogg = () => {
// let element = document.body;
// element.classList.toggle("dark-mode");
// setDarkMode(!darkMode);
// }


  return (
    <div className={props.darkMode? "header dark-mode-container" : "header"}>
    <h1>Where in the world?</h1>
    <button className={props.darkMode? 'header-btn dark-mode-container' : 'header-btn'} onClick={() => props.darkModeTogg()}>
       {props.darkMode? <SunIcon/> : <MoonIcon/> }<span >Dark Mode</span></button>
  </div>
 
  )
}
