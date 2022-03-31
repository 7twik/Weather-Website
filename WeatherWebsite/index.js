const express= require("express")
const bodyParser= require("body-parser")
const https=require("https")
const app=express()
        let temp=""
        let logo=""
        let lurl=""
        let pass=""
        let cond=""
        let rend=""
        let con=""
        let lon=""
        let lat=""
        let region= ""
        let time= ""
        let day= ""
        let date= ""
        var url2= ""
const { response } = require("express")
app.use(express.static(__dirname));
app.use (bodyParser.urlencoded({extended: true}))
app.set('view engine','ejs');
app.get ("/",function(req,res){
    res.sendFile(__dirname+"/views/index.html")
})
app.post("/",function(req,res){
    const key= "cf6ed141ea2ef0156520898573e62eb8"
    const query=req.body.CityName
    console.log(req.body)
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=metric&appid=" + key
    
    https.get(url,function(response){
        console.log(response.statusCode+" ,"+ query );
    
    response.on("data",function(data){
        weatherData=JSON.parse(data)
        temp=weatherData.main.temp
        logo=weatherData.weather[0].icon
        lurl="http://openweathermap.org/img/wn/"+ logo +"@2x.png"
        pass='<img src="'+lurl+'" width= "500px" >'
        cond=weatherData.weather[0].description
        console.log(temp+",,,"+pass)
        rend="The temperature of " + query +" is: "+ temp+"°C";
        lat=weatherData.coord.lat
        lon=weatherData.coord.lon
        console.log(lat+",,"+lon)
        con="The weather condition is : "+ cond
        console.log("im here")
        console.log(lat+",,"+lon)
        url2= 'https://www.timeapi.io/api/Time/current/coordinate?latitude='+ lat+'&longitude='+lon
        https.get(url2,function(response){
            console.log(response.statusCode+",,"+url2)
            response.on("data",function(data){
                TimeData=JSON.parse(data)
                region=TimeData.timeZone
                date=TimeData.date
                day=TimeData.dayOfWeek
                time=TimeData.time
                res.render ("index", {paste:rend, pass:pass, con:con, region:region, date:date, day:day, time:time});
            })
        })
    })
    })
    
})


app.listen(3000, function(){
    console.log("The server is running on port 3000")
})
