//variables

var searchbutton = $("search-button");
var uvindex = $("#uv-index");
var humidity = $("#humidity");
var speed = $("windspeed");
var city = $("city");
var clear = $("clear");
var temp = $("temp");



function currentcityWeather(city){
    
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){

        console.log(response);
        
        var wicon= response.weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+wicon +"@2x.png";

        var date=new Date(response.dt*1000).toLocaleDateString();
        
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");


        var fahrenheit = (response.main.temp- 273.15) * 1.80 + 32;
        $(temp).html((fahrenheit).toFixed(2)+"&#8457");
        $(humidity).html(response.main.humidity+"%");
        var ws=response.wind.speed;
        var windsmph=(ws*2.237).toFixed(1);
        $(speed).html(windsmph+"MPH");
        //UV Inquiry
        uvindex(response.coord.lon,response.coord.lat);
        forcast(response.id);
        if(response.cod==200){
            sCity = json.parse(localstorage.getItem("city"));
            console.log(sCity);
            if (sCity==null){
                sCity=[];
                sCity.push(city.touppercase()
                );
                localStorage.setItem("city",json.stringify(scity));
                addToList(city);
                   }
                   else { 
                       if(find(city)>0){
                           scity.push(city.touppercase());
                           localStorage.setItem("cityname",JSON.stringify(sCity));
                           addToList(city);
                       }



                       }
                
                }
            });

        }
        function loadlastCity(){
            $("ul").empty();
            var sCity = JSON.parse(localStorage.getItem("cityname"));
            if(sCity!==null){
                sCity=JSON.parse(localStorage.getItem("cityname"));
                for(i=0; i<sCity.length;i++){
                    addToList(sCity[i]);
                }
                city=sCity[i-1];
                currentWeather(city);
            }


        function find(c){
            for (var i=0; i<sCity.length; i++){
                if(c.toUpperCase()===sCity[i]){
                    return -1;
                }
            }
            return 1;
        }


$("#search-button").on("click",displayWeather);
$(document).on("click",invokePastSearch);
$(window).on("load",loadlastCity);
$("#clear-history").on("click",clearHistory);






//Clear search history
function clearHistory(event){
    event.preventDefault();
    sCity=[];
    localStorage.removeItem("city");
    document.location.reload();
}}
