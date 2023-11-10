// API USED IS OPENWEATHER

// API Key = 77255580c68db6883e1ed8b38da2247b

// API Call = https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.render("index.ejs");    
});

app.post("/weather", async(req, res)=>{
    let location = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=77255580c68db6883e1ed8b38da2247b&units=metric`;
   
    try{
        const response = await axios.get(url);
        console.log(response.data);
        const icon = response.data.weather[0].icon;
        console.log(icon);
        const iconurl = ` https://openweathermap.org/img/wn/${icon}@2x.png`;
        res.render("index.ejs",{
            data: response.data,
            icon_id: iconurl
        });
    } catch (error) {
        console.error("failed to make request", error.message);
        res.render("index.ejs",{
            error:("Oops!" +error.message)
        });
    }
});

app.listen(port,()=>{
    console.log(`sever running in port ${port}.`)
});