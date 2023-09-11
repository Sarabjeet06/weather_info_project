import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import 'dotenv/config'

const app=express();
const port=3000;
const api_key=process.env.API_KEY;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/",async (req,res)=>{
    try {
        const result=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${api_key}&units=metric`);
        res.render("index.ejs",{
            cityName: result.data.name,
            temp: result.data.main.temp,
            desc: result.data.weather[0].main,
            windSpeed: result.data.wind.speed,
            humidity: result.data.main.humidity,
            pressure: result.data.main.pressure,
            visibility: result.data.visibility,
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.post("/cityWeather",async (req,res)=>{
    try {
        const result=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body["city"]}&appid=${api_key}&units=metric`);
        res.render("index.ejs",{
            cityName: result.data.name,
            temp: result.data.main.temp,
            desc: result.data.weather[0].main,
            windSpeed: result.data.wind.speed,
            humidity: result.data.main.humidity,
            pressure: result.data.main.pressure,
            visibility: result.data.visibility,
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.listen(port, () =>{
    console.log(`The app is active on port ${port}`);
});