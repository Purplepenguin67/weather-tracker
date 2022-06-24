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

        var date=new Date(response.dt*1000).toLocaleDateString();
        
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">

        var fahrenheit = (response.main.temp- 273.15) * 1.80 + 32;
        $(temp).html((fahrenheit).toFixed(2)+"&#8457");
        $(humidity).html(response.main.humidity+"%");
        var ws=response.wind.speed;
        var windsmph=(ws*2.237).toFixed(1);
        $(speed).html(windsmph+"MPH");
        uvindex(response.coord.lon,response.coord.lat);
        forcast(response.id);
        if(response.cod==200){
            scity = json.parse(localstorage.getitem("city"));
            console.log(scity);
            if (scity==null){
                scity=[];
                scity.push(city.touppercase()
                );
                localStorage.setitem("city",json.stringify(scity));
                addtolist(city;)


            }


        }

    }

});
}




    
