import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Image from "next/image";
import Pagination from "../components/Pagination";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { type } from "os";


 function Home() {
                   

  const [tempCountryData, setTempCountryData] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);
  const [darkMode , setDarkMode] = useState(false);
  const [countryData, setCountryData] = useState<string[]>([]);

  useEffect(() => { 
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountryData(data))
      .then((err) => console.log(`An error occured ${err}`));
  }, []);


  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setTempCountryData(data))
      .then((err) => console.log(`An error occured ${err}`));
  }, []);

  console.log(countryData);

const darkModeTogg = () => {
  setDarkMode(!darkMode);
}

  const nextPage = () => {
    if (endIndex <= countryData.length) {
      setStartIndex(startIndex + 8);
      setEndIndex(endIndex + 8);
    }
  };

  const prevPage = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 8);
      setEndIndex(endIndex - 8);
    }
  };
  
  const filterByRegion = (regionName: string) => {
    setStartIndex(0);
    setEndIndex(8);
    
    if (regionName === "default-value") {
  return setTempCountryData(countryData);
    } else {
      const filterResult = countryData.filter(
        (data: any) => data.region === regionName
      );
     return setTempCountryData(filterResult);
    }
  };

  return (
    <>
      <Header darkMode={darkMode} darkModeTogg={darkModeTogg}/>
      <div className={darkMode ? "main-page dark-mode-body" :  "main-page" }>
        <SearchBar filterByRegion={filterByRegion} darkMode={darkMode}/>
        <div className="grid-section">
          {tempCountryData &&
            tempCountryData.slice(startIndex, endIndex).map((data: any) => (
              <div className={darkMode? "country-card dark-mode-container" : "country-card"} key={data.ccn3}>
                <Link href={`CountryDetail/${encodeURIComponent(data.name.common)}`}>
                  <Image
                    src={data.flags.png}
                    className="country-flag"
                    alt="country-flag"
                    width={260}
                    height={160}
                  />
                <div>
                    <ul className={darkMode? "country-details dark-mode-container" : "country-details"}>
                      <li className="country-details-head">{data.name.common}</li>
                      <li className="country-details-h">
                        Population: <span  className={darkMode? "dark-mode-container" : ""}>{new Intl.NumberFormat().format(data.population)}</span>
                      </li>
                      <li className="country-details-h">
                        Region: <span  className={darkMode? "dark-mode-container" : ""}>{data.region}</span>
                      </li>
                      <li className="country-details-h">
                        Capital: <span  className={darkMode? "dark-mode-container" : ""}>{data.capital}</span>
                      </li>
                    </ul>
                  </div>
                </Link>
              </div>
            ))}
          <Pagination nextPage={nextPage} prevPage={prevPage} darkMode={darkMode}/>
        </div>
      </div>
    </>
  );
}



export default Home