import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Image from "next/image";
import PicImage from "../design/country-img.jpeg";
import Pagination from "../components/Pagination";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [countryData, setCountryData] = useState<string[]>([]);
  const [tempCountryData, setTempCountryData] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);
  const [darkMode , setDarkMode] = useState(false);

  useEffect(() => {
    fetch("https://mocki.io/v1/f87157ff-f9a9-4820-92fa-30a52231249b")
      .then((res) => res.json())
      .then((data) => setCountryData(data))
      .then((err) => console.log(`An error occured ${err}`));
  }, []);

const darkModeTogg = () => {
  setDarkMode(!darkMode);
}

  useEffect(() => {
    setTempCountryData(countryData);
  }, [countryData]);

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
    if (regionName === "default-value") {
      setTempCountryData(countryData);
    } else {
      const filterResult = countryData.filter(
        (data: any) => data.region === regionName
      );
      setTempCountryData(filterResult);
    }
    setStartIndex(0);
    setEndIndex(8);
  };

  return (
    <>
      <Header darkMode={darkMode} darkModeTogg={darkModeTogg}/>
      <div className={darkMode ? "main-page dark-mode-body" :  "main-page" }>
        <SearchBar filterByRegion={filterByRegion} darkMode={darkMode}/>
        <div className="grid-section">
          {tempCountryData &&
            tempCountryData.slice(startIndex, endIndex).map((data: any) => (
              <div className={darkMode? "country-card dark-mode-container" : "country-card"}>
                <Link href="/CountryDetails">
                  <Image
                    src={PicImage}
                    className="country-flag"
                    alt="country-flag"
                  />

                  <div>
                    <ul className={darkMode? "country-details dark-mode-container" : "country-details"}>
                      <li className="country-details-head">{data.name}</li>
                      <li className="country-details-h">
                        Population: <span  className={darkMode? "dark-mode-container" : ""}>{data.population}</span>
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
          <Pagination nextPage={nextPage} prevPage={prevPage} />
        </div>
      </div>
    </>
  );
}
