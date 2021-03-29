var userInput = $("#cities");


$("#user-input").submit(function weatherCall(event) {
    event.preventDefault();
    var city = userInput.val()
    city = city.replace(/\s+/g, '+').toLowerCase();
    $("#user-input").trigger("reset");

    var CurrentDayUrl = "HTTPS://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=383f2227a811246655ccc2a5999d7dd2";

    fetch(CurrentDayUrl)
    .then(function (weatherInfo){
        if(weatherInfo.status === 200) {
            
            weatherInfo.json()
            .then(data=>{
                console.log(data);
            });

        } else {
            return;
        }
    });
    
});
