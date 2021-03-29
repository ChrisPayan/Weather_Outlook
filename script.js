var userInput = $("#cities");


$("#user-input").submit(function weatherCall(event) {
    event.preventDefault();
    var city = userInput.val()
    city = city.replace(/\s+/g, '+').toLowerCase();
});
