const apiKey = "147da2f42d534b9a9d9ef2cb824c0d81";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="

document.getElementById("weather-input").addEventListener("keydown", function(event) {
    if(event.key == "Enter")
    {
        const city_name = document.getElementById("weather-input").value;
        const url = urlAppend(city_name);
        //document.getElementById("demo").innerHTML = url
        fetchData(url, city_name);
        document.getElementById("weather-input").value = "";
    }
});

document.getElementById("weather-button").addEventListener("click", function()
{
    const city_name = document.getElementById("weather-input").value;
    const url = urlAppend(city_name);
    fetchData(url, city_name);
    document.getElementById("weather-input").value = "";

});

function urlAppend(city_name)
{
    const url = apiUrl + city_name + '&appid=' + apiKey + '&units=imperial';
    return url;
}

function capLetters(desc){
    let str = desc.split(' ');

    for(let i = 0; i < str.length; i++)
    {
        str[i] = str[i][0].toUpperCase() + str[i].substring(1);
    }
    return str.join(" ");
}

function fetchData(url, city_name)
{
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const jsonData = JSON.stringify(data);
            const icon = data.weather[0].icon;
            const temp = data.main.temp;
            const desc = data.weather[0].description;
            const humidity = data.main.humidity;
            const wind = data.wind.speed;
            const link = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            document.getElementById("weather-icon").src = link;
            document.getElementById("icon-text").innerHTML = capLetters(desc);
            document.getElementById("city").innerHTML = city_name.toUpperCase();
            document.getElementById("temperature").innerHTML = Math.round(temp) + "°";
            document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";
            document.getElementById("wind").innerHTML = "Wind: " + wind + " mph";

        })
        .catch(error => {
            console.error('Error:', error);
    })
}


