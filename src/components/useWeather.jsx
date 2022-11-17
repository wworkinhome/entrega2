import axios from 'axios';
import {useEffect} from 'react';
import {useState} from 'react';

const userWeather = () => {

    const [isTime, setIsTime] = useState({})

    useEffect(() => {
        const success = pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=591d48578b9dc493d5f9dae92984c727`)
            .then( res => setIsTime( res.data ))
        }

        navigator.geolocation.getCurrentPosition(success);
    }, [])

    console.log(isTime)

    return {isTime}
};

export default userWeather;