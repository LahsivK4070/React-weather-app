import React, { useState } from "react";
import defaultImg from "./images/default.jpg";
import Clear from "./images/clear.jpg";
import Haze from "./images/haze.jpg";
import Thunder from "./images/thunderStorm.jpg";
import Rain from "./images/rain.jpg";
import Snow from "./images/snow.jpg";
import Cloud from "./images/cloud.jpg";
import axios from "axios";

function App() {

  let [data, setData] = useState({});
  let [location, setLocation] = useState("");
  let [customStyle, setStyle] = useState({ display: "none" });
  let [bgImg, setImg] = useState({ backgroundImage: `url(${defaultImg})` });

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=deba9ec38da0d3ac67de64aca83b4ee3&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        setStyle({ display: "flex" });
        setLocation("");
        console.log(response.data);
        let imgValue = response.data.weather[0].main;
        if (imgValue === "Clear") {
          setImg({ backgroundImage: `url(${Clear})` });
        }
        else if(imgValue === "Clouds"  ) {
          setImg({ backgroundImage: `url(${Cloud})` });
        }
        else if (imgValue === "Thunderstorm") {
          setImg({ backgroundImage: `url(${Thunder})` });
        }
        else if (imgValue === "Drizzle" || imgValue === "Rain") {
          setImg({ backgroundImage: `url(${Rain})` });
        }
        else if (imgValue === "Snow") {
          setImg({ backgroundImage: `url(${Snow})` });
        }
        else {
          setImg({ backgroundImage: `url(${Haze})` });
        }
      })
    }
  }

  return (
    <div className="app" style={bgImg}>
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{ data.name }</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{ data.main.temp.toFixed() }°C</h1> : null}
          </div>
          <div className="desc">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom" style={customStyle}>
          <div className="feels">
            {data.main ? <p>{ data.main.feels_like.toFixed() }°C</p> : null}
            <p className="bottom-desc">Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p>{ data.main.humidity }%</p> : null}
            <p className="bottom-desc">Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p>{ data.wind.speed.toFixed() }MPH</p> : null}
            <p className="bottom-desc">Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
