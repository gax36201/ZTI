const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('p.error_message');
const date = document.querySelector('p.date');
const cityName = document.querySelector('h2.city_name');
const img = document.querySelector('img.weather_img');
const temp = document.querySelector('span.temp');
const description = document.querySelector('p.weather_description');
const feelsLike = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const windSpeed = document.querySelector('span.wind_speed');
const visibility = document.querySelector('span.visibility');
const clouds = document.querySelector('span.clouds');

const apiInfo = {
    link: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: '&appid=f9004f0ceef8ac703025ecd04b017e91',
    units: '&units=metric',
    lang: '&lang=pl'
}

const getWeatherInfo = () => {
    const apiInfoCity = input.value || 'Gdańsk';
    const apiURL = `${apiInfo.link}${apiInfoCity}${apiInfo.key}${apiInfo.units}${apiInfo.lang}`;
    //console.log(apiURL);

    document.querySelector('.weather_top').style.display = 'flex';
    document.querySelector('.weather_bottom').style.display = 'flex';


    axios.get(apiURL).then((response) => {
        console.log(response.data);
        const timestamp = response.data.dt;
        const timezone = response.data.timezone;
        const localTime = new Date(Date.now()+ timezone - 7200)

        date.textContent = localTime.toLocaleString('pl-PL', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        description.textContent = `${response.data.weather[0].description}`;
        img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        clouds.textContent = `${response.data.clouds.all}%`;
        visibility.textContent =`${response.data.visibility/1000}km`;
        windSpeed.textContent = `${response.data.wind.speed} km/h`;
        feelsLike.textContent = `${Math.round(response.data.main.feels_like)}°C`;
        humidity.textContent = `${response.data.main.humidity}%`;
        pressure.textContent = `${response.data.main.pressure}`;
        errorMsg.textContent = '';
    })
    .catch((error) => {
        console.log(error);
        errorMsg.textContent = `${error.response.data.cod} - ${error.response.data.message}`;
        [date,cityName,temp,description,feelsLike,humidity,pressure,windSpeed,visibility,clouds].forEach(el => {
            el.textContent = '';
        })
        img.src = '';
    })

}

const getWeatherInfoByEnter = (e) => {
    if (e.key === 'Enter'){
        getWeatherInfo();
    }
}

button.addEventListener('click',getWeatherInfo);
input.addEventListener('keypress',getWeatherInfoByEnter);