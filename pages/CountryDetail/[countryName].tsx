import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import LeftArrow from "../../components/LeftArrow";
import Link from "next/link";
import { type } from "os";
import Image from "next/image";

export default function CountryDetails() {
  const [darkMode, setDarkMode] = useState(false);
  const [individualData, setIndividualData] = useState<string[]>([]);

  const router = useRouter();
  const name = router.query.countryName as string;


  const darkModeTogg = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setIndividualData(data))
      .catch((err) => console.log(`An error occured ${err}`));
  }, []);

  try {
   
} catch(e) {
    console.log((e as Error).message)
}

  return (
    <>
      <Header darkMode={darkMode} darkModeTogg={darkModeTogg} />
      <div className={darkMode ? "dark-mode-body detail-page" : "detail-page"}>
        <Link href="/">
          <div
            className={darkMode ? "left-btn dark-mode-container" : "left-btn"}
          >
            <LeftArrow darkMode={darkMode} /> Back
          </div>
        </Link>
        <div
          className={
            darkMode ? "detail-container dark-mode-body" : "detail-container"
          }
        >
          {individualData &&
            individualData
              .filter((data: any) => data.name.common === name)
              .map((data: any) => (
                <React.Fragment key={data.ccn3}>
                  <div>
                    <Image
                      src={data.flags.png}
                      alt="country-flag"
                      className="country-img"
                      width={320}
                      height={200}
                    />
                  </div>
                  <div className="country-detail">
                    <h3>{data.name.common}</h3>
                    <div className="country-detail-sub">
                      <ul className="detail-sub">
                        <li>
                          Native Name: <span className={darkMode? "detail-sub-value" : ""}>
                            {data.name.official}
                            </span>
                        </li>
                        <li>
                          Population: <span className={darkMode? "detail-sub-value" : ""}>
                               {new Intl.NumberFormat().format(data.population)}
                          </span>
                        </li>
                        <li>
                          Region:  <span className={darkMode? "detail-sub-value" : ""}>{data.region}</span>
                        </li>
                        <li>
                          Sub Region:  <span className={darkMode? "detail-sub-value" : ""}>{data.subregion}</span>
                        </li>
                        <li>
                          Capital:   <span className={darkMode? "detail-sub-value" : ""}>{data.capital[0]}</span>
                        </li>
                      </ul>
                      <ul className="detail-sub">
                        <li>
                          Time Zone:   <span className={darkMode? "detail-sub-value" : ""}>{data.timezones[0]}</span>
                        </li>
                        <li>
                          Currencies: <span className={darkMode? "detail-sub-value" : ""}>{Object.values(data.currencies as Record<string, { name: string }>)[0].name}</span>
                        </li>
                        <li>
                          Languages: <span className={darkMode? "detail-sub-value" : ""}>
                            {Object.values(data.languages).join(", ")}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="border-country">
                        Border Countries:
                        </div>
                    <ul className="border-country-title">
                        {data.borders &&
                          data.borders.map((borderName: string) => (
                            <li
                              className={darkMode ? "dark-mode-container" : " "}
                              key={data.borders.indexOf(borderName)}
                            >
                              {borderName}
                            </li>
                          ))}
                  
                    </ul>
                  </div>
                </React.Fragment>
              ))}
        </div>
      </div>
    </>
  );
}
