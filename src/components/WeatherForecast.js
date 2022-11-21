import { useState, useEffect } from "react";
import axios from 'axios';

const WeatherForecast = () => {

    const APIkey = "d41426a86b50ae4f3e548cc1a2f1850a";

    const [location, setLocation] = useState('Istanbul');
    const [data, setData] = useState('');


    useEffect(() => {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIkey}`;
        axios.get(weatherUrl)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err.data);
            })
    }, [location]);

    if (data) {
        console.log("data: ", data.city.name);
    }

    return (
        <div>
            {
                data ? (
                    data.list.map((dt, index) => (
                        <ul key={index}>
                            <li>{dt.dt_txt}</li>
                            <li>{dt.main.temp}</li>
                            <li>{dt.weather[0].main}</li>
                            <li>{dt.visibility}</li>
                            <li>{dt.main.feels_like}</li>
                            <li>{dt.main.humidity}</li>
                            <li>{dt.wind.speed}</li>
                        </ul>
                    ))
                ) : null
                
            }
        </div>
    );
}
export default WeatherForecast;