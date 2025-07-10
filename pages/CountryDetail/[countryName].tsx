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
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,borders,timezones,currencies,subregion,languages")
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
                            {data?.name?.official ?? "N/A"}
                            </span>
                        </li>
                        <li>
                          Population: <span className={darkMode? "detail-sub-value" : ""}>
                            {typeof data.population === 'number' ? new Intl.NumberFormat().format(data.population) : "N/A"}
                          </span>
                        </li>
                        <li>
                          Region:  <span className={darkMode? "detail-sub-value" : ""}>{data?.region ?? "N/A"}</span>
                        </li>
                        <li>
                          Sub Region:  <span className={darkMode? "detail-sub-value" : ""}>{data?.subregion ?? "N/A"}</span>
                        </li>
                        <li>
                          Capital:   <span className={darkMode ? "detail-sub-value" : ""}>
                            {Array.isArray(data.capital) && data.capital.length > 0 ? data.capital[0] : "N/A"}
                          </span>
                        </li>
                      </ul>
                      <ul className="detail-sub">
                        <li>
                          Time Zone:   <span className={darkMode? "detail-sub-value" : ""}>
                            {Array.isArray(data.timezones) && data.timezones.length > 0 ? data.timezones[0] : "N/A"}
                          </span>
                        </li>
                        <li>
                          Currencies: <span className={darkMode? "detail-sub-value" : ""}>
                            {data.currencies && Object.values(data.currencies).length > 0 && (Object.values(data.currencies)[0] as any)?.name ? (Object.values(data.currencies)[0] as any).name : "N/A"}
                          </span>
                        </li>
                        <li>
                          Languages: <span className={darkMode? "detail-sub-value" : ""}>
                            {data.languages && Object.values(data.languages).length > 0 ? Object.values(data.languages).join(", ") : "N/A"}
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
