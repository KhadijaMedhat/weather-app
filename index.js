import express from"express";
import axios from"axios";
const app =express();
const port =3000;

const API_KEY="8e87fb722746ddd8a6f8768085943efe";

app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index",{weather: null, error: null});
});
app.post("/",async (req, res) => {
    const city=req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try{
        const response =await axios.get(url);
        const data=response.data;
        const weather ={
            city:data.name,
            temp:data.main.temp,
            humidity:data.main.humidity,
            desc:data.weather[0].description,
        };
        res.render("index",{weather, error:null});
    }catch(err){
        res.render("index",{weather:null, error:"City not found!"});
    }
});


app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
});

