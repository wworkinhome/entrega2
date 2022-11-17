import React, {useWeather} from "react";
import Form from './Form';
import Card from './Card';

const weather = () =>{
    let urlWeather = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=591d48578b9dc493d5f9dae92984c727&languages=es";
    let cityUrl ="&q=";

    let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=591d48578b9dc493d5f9dae92984c727&languages=es";

    const [weather, setWeather] = userState([]);
    const [forecast, setForecast] = userState([]);
    const [loading, setLoading] = userState(false); //Spiner
    const [show, setShow] = userState(false);
    const [location, setLocation] = userState("");

    const getLocation = async(loc) =>{
        setLoading(true); 
        setLocation(loc);   
        
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

        urlForescast = urlForecast + cityUrl + loc;

        await fetch(urlForecast).then((response) =>{
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

        return(
            <React.Fragment>
                <form
                    newLocation = {getLocation}
                />

                <Card
                    showData = {show}
                    loadingData = {loading}
                    weather = {weather}
                    Forecast = {forecast} 
                />
            </React.Fragment>
        );
    }
}

export default  WeatherPanel;