function initPage() {
    const inputEl = document.getElementById("city-input");
    const searchEl = document.getElementById("search-button");
    const clearEl = document.getElementById("clear-history");
    const nameEl = document.getElementById("city-name");
    const currentPicEl = document.getElementById("current-pic");
    const currentTempEl = document.getElementById("temperature");
    const currentHumidityEl = document.getElementById("humidity");
    const currentWindEl = document.getElementById("wind-speed");
    const currentUVEl = document.getElementById("UV-index");
    const historyEl = document.getElementById("history");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);
    

    const APIKey = "1ec24bc722c18b04d7c7d69de312c184";


    function getWeather(cityName) {

        let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
        .then(function(response){
            console.log(response);

            console.log(currentDate);
            const currentDate = new Date(response.data.dt*1000);
            const year = currentDate.getFullYear();
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            

            nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            let weatherPic = response.data.weather[0].icon;
            currentPicEl.setAttribute("src","" + weather + "");
            currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
            currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
            currentPicEl.setAttribute("alt",response.data.weather[0].description);
            currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            
        let lon = response.data.coord.lon;    
        let lat = response.data.coord.lat;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
        axios.get(UVQueryURL)
        .then(function(response){
            let UVIndex = document.createElement("span");
            UVIndex.innerHTML = response.data[0].value;
            UVIndex.setAttribute("class","badge badge-danger");
            currentUVEl.append(UVIndex);
            currentUVEl.innerHTML = "UV Index: ";
            
        });


        let cityID = response.data.id;
        let forecastQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityID + "&appid=" + APIKey;
        axios.get(forecastQueryURL)
        .then(function(response){

            console.log(response);
            const forecastEls = document.querySelectorAll(".forecast");
            for (i=0; i<forecastEls.length; i++) {
                forecastEls[i].innerHTML = "";
                const forecastIndex = i*8 + 4;
                const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();
                const forecastDateEl = document.createElement("p");
                forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
                forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                forecastEls[i].append(forecastDateEl);
                const forecastWeatherEl = document.createElement("img");
                forecastWeatherEl.setAttribute("src","" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
                forecastEls[i].append(forecastWeatherEl);
                const forecastTempEl = document.createElement("p");
                forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                forecastEls[i].append(forecastTempEl);
                const forecastHumidityEl = document.createElement("p");
                forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                forecastEls[i].append(forecastHumidityEl);
                }
            })
        });  
    }



    clearEl.addEventListener("click",function() {
        renderSearchHistory();
        searchHistory = [];
        
    })

  

    function renderSearchHistory() {
        historyEl.innerHTML = "";
        for (let i=0; i<searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("readonly",true);
            historyItem.setAttribute("type","text");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.addEventListener("click",function() {
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }

    function k2f(K) {
        return Math.floor((K - 273.15) *1.8 +32);
    }

    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }

    searchEl.addEventListener("click",function() {
        const searchTerm = inputEl.value;
        searchHistory.push(searchTerm);
        getWeather(searchTerm);
        renderSearchHistory();
        localStorage.setItem("search",JSON.stringify(searchHistory));
        
    })

}
initPage();