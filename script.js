var userInput = $("#cities");
var currentCity = $("#currentCity");
var currentDay = $("#currentDay");
var currentTemperature = $("#currentTemp");
var currentUVIndex = $("#currentUVIndex");
var currentHumidity = $("#currentHumidity");
var currentWindSpeed = $("#currentWindSpeed");

var days = [
    $("#day-1"),
    $("#day-2"),
    $("#day-3"),
    $("#day-4"),
    $("#day-5"),
];

var icons = [
    $("#icon-day-1"),
    $("#icon-day-2"),
    $("#icon-day-3"),
    $("#icon-day-4"),
    $("#icon-day-5"),
]

var temperature = [
    $("#temp-day-1"),
    $("#temp-day-2"),
    $("#temp-day-3"),
    $("#temp-day-4"),
    $("#temp-day-5"),
]

var humidity = [
    $("#humi-humi-1"),
    $("#humi-humi-2"),
    $("#humi-humi-3"),
    $("#humi-humi-4"),
    $("#humi-humi-5"),
]
var travelOptions = [
    $("#city1"),
    $("#city2"),
    $("#city3"),
    $("#city4"),
    $("#city5"),
    $("#city6"),

]
//When a new location is inputted push all value down 1
function getStored() {
    var citySaved = window.localStorage;
    console.log(citySaved.length)
    for (i=0; i < citySaved.length; i+=1) {
    $(travelOptions[i]).html(window.localStorage.key(i));
    $(travelOptions[i]).css("display", "block");
    };
}


$("#user-input").submit(function weatherCall(event) {
    event.preventDefault();
    var city = userInput.val()
    city = city.replace(/\s+/g, '+').toLowerCase();
    var userCity = userInput.val()
    $("#user-input").trigger("reset");

    var CurrentDayUrl = "HTTPS://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=383f2227a811246655ccc2a5999d7dd2";

    fetch(CurrentDayUrl)
    .then(function (weatherInfo){
        if(weatherInfo.status === 200) {
            
            weatherInfo.json()
            .then(data=>{
                console.log(data); 

                var cityName = data.name;
                console.log(cityName);
                var date = moment().format("MM/DD/YYYY");
                var temp = data.main.temp;
                var humid = data.main.humidity;
                var windspeed = data.wind.speed;

                currentCity.html(cityName + "  " + date);
                currentHumidity.html("Humidity: " + humid);
                currentTemperature.html("Temperature: " + temp);
                currentWindSpeed.html("Wind Speed: " + windspeed);


                // console.log(date);
                var icon = data.weather[0].icon;
                var iconUrl = "HTTPS://openweathermap.org/img/wn/" + icon + "@2x.png";
                console.log(iconUrl);
                $("#currentDayIcon").attr("src", iconUrl);

                var fiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=383f2227a811246655ccc2a5999d7dd2"
                fetch (fiveDayUrl)
                 .then(function (fiveDayWeather){
                     console.log(fiveDayUrl);
                     fiveDayWeather.json()
                     .then(data=>{
                         console.log(data);
                         for(i=1; i<6; i++) {
                             var dataday = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
                             days[i-1].html(dataday);

                             var iconCode = data.daily[i].weather[0].icon;
                             var weatherIconUrl = "HTTPS://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                             icons[i-1].attr("src", weatherIconUrl);
                             temperature[i-1].html("temperature: " + data.daily[i].temp.day);
                             humidity[i-1].html("humidity: " + data.daily[i].humidity);
                         }
                     })
                 });
                    var uvIndexUrl ="https://api.openweathermap.org/data/2.5/uvi?lat="+ 
                    data.coord.lat+ "&lon=" +data.coord.lon+ "&appid=383f2227a811246655ccc2a5999d7dd2";
                    fetch(uvIndexUrl)
                    .then(function(uvData){
                    console.log(uvData);
                    uvData.json()
                    .then(data => {
                        console.log(data.value);
                        currentUVIndex.html("UV Index: " + data.value);
                        $("#current-weather").css("display", "block");
                        $("#five-day").css("display", "block");
                    });
                    window.localStorage.setItem(userCity, userCity);
                    window.localStorage.getItem(userCity);
                    getStored();
                }); 
            });
            

        } else {
            return;
        }
       
    });


    
});
