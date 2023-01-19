import React, { useState } from "react";
import Header from "../components/Header";
import LeftArrow from "../components/LeftArrow";
import Image from "next/image";
import PicImage from "../design/country-img.jpeg";
import Link from "next/link";

export default function CountryDetails() {
  const [darkMode, setDarkMode] = useState(false);
  const darkModeTogg = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Header darkMode={darkMode} darkModeTogg={darkModeTogg} />
      <div className={darkMode ?  "dark-mode-body detail-page" : "detail-page"}>
      <Link href="/">
        <div className={darkMode ? "left-btn dark-mode-container" : "left-btn"}>
          <LeftArrow darkMode={darkMode}/> Back
        </div>
      </Link>
      <div className={darkMode ?  "detail-container dark-mode-body" : "detail-container"}>
        <div>
          <Image src={PicImage} alt="country-flag" className="country-img" />
        </div>

        <div className="country-detail">
          <h3>Country Name</h3>
          <div className="country-detail-sub">
            <ul className="detail-sub">
              <li>
                Native Name: <span>Top Level Domain</span>{" "}
              </li>
              <li>
                Population: <span>Top Level Domain</span>{" "}
              </li>
              <li>
                Region:<span>Top Level Domain</span>{" "}
              </li>
              <li>
                Native Name: <span>Top Level Domain</span>{" "}
              </li>
              <li>
                Sub Region: <span>Top Level Domain</span>{" "}
              </li>
              <li>
                Capital: <span>Top Level Domain</span>{" "}
              </li>
            </ul>
            <ul className="detail-sub">
              <li>
                Top Level Domain:<span>Top Level Domain</span>{" "}
              </li>
              <li>
                Currencies: <span>Top Level Domain</span>{" "}
              </li>
              <li>
                Languages:<span> Top Level Domain</span>{" "}
              </li>
            </ul>
          </div>
          <ul className="border-country-title">
            <li className="border-country">
              Border Countries: <span className={darkMode ? "dark-mode-container" : " "}>Top Level Domain</span>{" "}
            </li>
          </ul>
        </div>
      </div>
      </div>
    </>
  );
}
