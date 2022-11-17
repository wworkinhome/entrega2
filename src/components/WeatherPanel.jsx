import React, {useState} from "react";
import Form from './Form';
import Card from './Card';

const WeatherPanel = () =>{
    let urlWeather = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=591d48578b9dc493d5f9dae92984c727&languages=es";
    let cityUrl ="&q=";

    let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=591d48578b9dc493d5f9dae92984c727&languages=es";

    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false); //Spiner
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState("");

    const getLocation = async(loc) =>{
        setLoading(true); 
        setLocation(loc);   
        let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=591d48578b9dc493d5f9dae92984c727&languages=es`;
        let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=591d48578b9dc493d5f9dae92984c727&languages=es`;
        
        //weather

        urlWeather + cityUrl + loc;

        await fetch(urlWeather).then((response) =>{
            if(!response.ok) throw{response}
            return response.json();
        }).then((weatherData) =>{
            console.log(weatherData);
            setWeather(weatherData);
        }).catch(error=>{
            console.log(error);
            setLoading(false);
            setShow(false);
        });

        //Forescast

        const urlForescast = urlForecast + cityUrl + loc;

        await fetch(urlForescast).then((response) =>{
            if(!response.ok) throw{response}
            return response.json();
        }).then((forecastData) =>{
            console.log(forecastData);
            setForecast(forecastData);

            setLoading(false);
            setShow(true);
        }).catch(error=>{
            console.log(error);
            setLoading(false);
            setShow(false);
        });

    }
    return(
        <React.Fragment>
            <Form
                newLocation = {getLocation}
            />

            <Card
                showData = {show}
                loadingData = {loading}
                weather = {weather}
                forecast = {forecast} 
            />
        </React.Fragment>
    );
}

export default  WeatherPanel;