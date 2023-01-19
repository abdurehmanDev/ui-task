import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import PicImage from "../design/desktop-design-detail-dark.jpg";

export default function Countrycard() {
  const [countryData, setCountryData] = useState<string[]>([]);
  const [tempCountryData, setTempCountryData] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);
   
  useEffect(() => {
    fetch("https://mocki.io/v1/f87157ff-f9a9-4820-92fa-30a52231249b")
      .then((res) => res.json())
      .then((data) => setCountryData(data))
      .then((err) => console.log(`An error occured ${err}`));
  }, []);

  useEffect(() => {
   setTempCountryData(countryData)
  }, [countryData]);

  const nextPage = () => {
    if (endIndex <= countryData.length) {
      setStartIndex(startIndex + 8);
      setEndIndex(endIndex + 8);
    }
  };

  // console.log(startIndex, endIndex, countryData.length);

  const prevPage = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 8);
      setEndIndex(endIndex - 8);
    }
  };

  const filterByRegion = (regionName: string) => {
   
    if(regionName === "default-value") {
      setTempCountryData(countryData);
    }
     else {
      const filterResult = countryData.filter(
        (data: any) => data.region === regionName
      );
      setTempCountryData(filterResult);
     }
    setStartIndex(0);
    setEndIndex(8);
   
  };
  console.log(tempCountryData);
console.log(startIndex,  endIndex);

  // let a = 0;
  //    countryData.splice(0,8).map((data: any) => console.log("countryData ",a++, data.region));

  return (
    <>
     
     <div className="filter">
  
  <select className='form-control select-bar' onChange={(e) => filterByRegion(e.target.value)}>
    <option value="default-value">Filter by Region</option>
    <option value='Americas'>Americas</option>
    <option value='Asia'>Asia</option>
    <option value='Africa'>Africa</option>
    <option value='Europe'>Europe</option>
    <option value='Oceania'>Oceania</option>
    <option value='Polar'>Polar</option>
  </select>
</div>



      {tempCountryData &&
        tempCountryData.slice(startIndex, endIndex).map((data: any) => (
          <div className="country-card">
            <Image src={PicImage} className="country-flag" alt="country-flag" />

            <div>
              <ul className="country-details">
                <li className="country-details-head">{data.name}</li>
                <li className="country-details-h">
                  Population: <span>{data.population}</span>
                </li>
                <li className="country-details-h">
                  Region: <span>{data.region}</span>
                </li>
                <li className="country-details-h">
                  Capital: <span>{data.capital}</span>
                </li>
              </ul>
            </div>
          </div>
        ))}

      <div className="pagination">
        <a onClick={prevPage}>&laquo;</a>
        <a href="#">1</a>
        <a className="active" href="#">
          2
        </a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a onClick={nextPage}>&raquo;</a>
      </div>
    </>
  );
}
