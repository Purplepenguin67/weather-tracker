var cities = [];

var pastButton= document.querySelector("#past-search-buttons");
var citySearch = document.querySelector("#searched-city");
var cityForm=document.querySelector("#city-search-form");
var weatherDisplay=document.querySelector("#current-weather-container");
var cityChoice=document.querySelector("#city");
var forecastMain = document.querySelector("#fiveday-container");
var forecastDay= document.querySelector("#forecast");



var formSumbitHandler = function(event){
    event.preventDefault();
    var city = cityChoice.value.trim();
    if(city){
        CityWeather(city);
        fiveForcast(city);
        
        
        cities.unshift({city});
        cityChoice.value = "";
    } else{
        alert("Chose a City");
    }
    saveCitySearch();
    previousSearch(city);
}

var saveCitySearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};



var CityWeather = function(city){
    var apiKey = "1ec24bc722c18b04d7c7d69de312c184"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            weatherView(data, city);
        });
    });
};



var weatherView = function(weather, searchCity){
   
   weatherDisplay.textContent= "";  
   citySearch.textContent=searchCity;

   


   
   var currentDate = document.createElement("span")
   currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   citySearch.appendChild(currentDate);



   
   var weatherIcon = document.createElement("img")
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   citySearch.appendChild(weatherIcon);


   var humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item"
   
   var windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedEl.classList = "list-group-item"

   var temperatureEl = document.createElement("span");
   temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
   temperatureEl.classList = "list-group-item"

   
   weatherDisplay.appendChild(humidityEl);

   weatherDisplay.appendChild(windSpeedEl);

   weatherDisplay.appendChild(temperatureEl);

   
   

   
   

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getIndex(lat,lon)
}



var getIndex = function(lat,lon){
    var apiKey = "1ec24bc722c18b04d7c7d69de312c184"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            showIndex(data)
           
        });
    });
    
}
 


var showIndex = function(index){
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2){
        uvIndexValue.classList = "favorable"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate "
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe"
    };

    weatherDisplay.appendChild(uvIndexEl);

    uvIndexEl.appendChild(uvIndexValue);

}



var fiveForcast = function(city){
    var apiKey = "1ec24bc722c18b04d7c7d69de312c184"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`




    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayForcast(data);
        });
    });
};

var displayForcast = function(weather){
    forecastMain.textContent = ""
    forecastDay.textContent = "Forcast for 5 days:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
       


       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";



       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  
    

       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

       
       
       

     
       forecastEl.appendChild(weatherIcon);
       
       
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

      

        forecastEl.appendChild(forecastTempEl);



       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";


       
       forecastMain.appendChild(forecastEl);

       forecastEl.appendChild(forecastHumEl);

      

       
    }

}

var searchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        CityWeather(city);
        fiveForcast(city);
    }
}

var previousSearch = function(pastSearch){
 
    

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastButton.prepend(pastSearchEl);
}






cityForm.addEventListener("submit", formSumbitHandler);
pastButton.addEventListener("click", searchHandler);