import axios from 'axios';
import express, { response } from 'express';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

const options = {
  method: 'GET',
  url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
  params: {city: 'Delhi'},
  headers: {
    'X-RapidAPI-Key': '29384a07f7msh331c219a0a8893cp14c5b8jsnbb17f4f8d459',
    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
  }
};

app.get("/search", (req, res) => {
    res.redirect("/");
});

let weather = [[0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]];

let city_Names = ["Hyderabad", "Chennai", "Kolkata", "Lucknow", "Pune", "Ahmedabad"];

async function f(helper) {
    return new Promise((resolve, reject) => {
        if (true) {
            resolve(helper());
        }
        else {
            reject(error);
        }
    })
}

async function helper()
{
    for (var i = 0; i < 6; i++){
        options.params.city = city_Names[i];
        const response = await axios.request(options);
        weather[i][0] = response.data.cloud_pct;
        weather[i][1] = response.data.temp;
        weather[i][2] = response.data.feels_like;
        weather[i][3] = response.data.humidity;
        weather[i][4] = response.data.min_temp;
        weather[i][5] = response.data.max_temp;
        weather[i][6] = response.data.wind_speed;
        weather[i][7] = response.data.wind_degrees;
    }
}

app.get("/", async (req, res) => {
    await f(helper);
    let city_name = "Delhi";
    options.params.city = city_name;
    try {
        const response = await axios.request(options);
        res.render("index.ejs", {
            activity: response.data,
            city: city_name,
            weather:weather
        });
    } catch (error) {
        res.render("error.ejs");
    } 
});

app.post("/search", async (req, res) => {
    let city_name = req.body.city_name;
    options.params.city = city_name;
    try {
        const response = await axios.request(options);
        res.render("index.ejs", {
            activity: response.data,
            city: city_name,
            weather:weather});
    } catch (error) {
        res.render("error.ejs");
    } 
});


app.listen(3000, () => {
    console.log("Server is running on port 3000"); 
});