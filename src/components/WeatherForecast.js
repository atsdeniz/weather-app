import { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Form, Card } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { WiRain, WiCloudy, WiDaySunny } from "react-icons/wi";

const WeatherForecast = () => {

    const APIkey = "d41426a86b50ae4f3e548cc1a2f1850a";

    const [location, setLocation] = useState('Istanbul');
    const [data, setData] = useState('');
    const [searchValue, setSearchValue] = useState('');


    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocation(searchValue);
    }

    const cleanSearch = () => setSearchValue('');

    let wicon;
    switch(data ? data.list[0].weather[0].main : ""){
        case "Rain":
            wicon = <WiRain  style={{color: 'white', fontSize: '200px'}} />;
            break;
        case "Clouds":
            wicon = <WiCloudy  style={{color: 'white', fontSize: '200px'}}/>;
            break;
        case "Sunny":
            wicon = <WiDaySunny  style={{color: 'yellow', fontSize: '200px'}}/>;
            break;
        default:
            wicon = "";

    }


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


    return (
        <>
            <div>
                <Card className="mt-2" style={{ width: '25rem', height: '37rem', margin: '0 auto', background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))' }}>
                    <Form onSubmit={handleSubmit} className="mb-5 mt-5 opacity-25 col-11" style={{ margin: '0 auto' }}>
                        <Form.Group>
                            <div className="wrapper">
                                <Form.Control className="input"
                                    type="text"
                                    placeholder="Search"
                                    value={searchValue}
                                    onChange={handleChange}
                                    onClick={cleanSearch} >
                                </Form.Control>
                                <span className="icon"><BsSearch /></span>
                            </div>
                        </Form.Group>
                    </Form>
                    {
                        data ? (
                            <div>
                                {wicon}
                                <h2>{data.city.name}</h2>
                                <h5>{new Date().toLocaleString() + ''}</h5>
                                <h1>{Math.ceil(data.list[0].main.temp - 273.15) + '\u00b0'}</h1>
                            </div>
                        ) : null

                    }
                </Card>
            </div>
        </>

    );
}
export default WeatherForecast;