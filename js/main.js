import { buildUrlWeatherToday, buildUrlWeatherThreeDays } from "./api.js";

const getWeather = async () => {
  const wrapper = document.getElementById('wrapper');
  const imgWrapper = document.getElementsByClassName('img-wrapper');
  const loading = document.getElementById('loading');
  wrapper.classList.add('hide');
  loading.classList.remove('hide');

  const city = document.getElementById('city')?.value;
  const response = await fetch(buildUrlWeatherToday(city));
  const result = await response.json();

  const weeklyResponse = await fetch(buildUrlWeatherThreeDays(city));
  const weeklyResult = await weeklyResponse.json();
  generateWeatherForToday(result);
  generateWeatherForThreeDays(weeklyResult);
  wrapper.classList.remove('hide');

  loading.classList.add('hide');
  imgWrapper.classList.remove('hide');
}

const getImageSrc = icon => `https://openweathermap.org/img/wn/${icon}@2x.png`

const generateWeatherForToday = result => {
  document.getElementById('name').innerHTML = result.name;
  const icon = result.weather[0]?.icon;
  document.getElementById('img').setAttribute('src', getImageSrc(icon));
  document.getElementById('temp').innerHTML = `${result.main.temp} C'`;
  document.getElementById('feel').innerHTML = `Feels like: ${result.main.feels_like} C'`;
  document.getElementById('max').innerHTML = `Max: ${result.main.temp_max} C'`;
  document.getElementById('min').innerHTML = `Min: ${result.main.temp_min} C'`;
  document.getElementById('visibility').innerHTML = `Visibilities: ${Number(result.visibility / 1000)} km`;
  document.getElementById('wind').innerHTML = `Speed wind ${result.wind.speed} m/s`;
}

const generateWeatherForThreeDays = result => {
  const weekly = document.getElementById('weekly');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const listInfo = result.list;
  const additionalInfo = document.getElementsByClassName('additional-info');

  while(additionalInfo.length > 0) {
    additionalInfo[0].parentNode.removeChild(additionalInfo[0]);
  }

  for (let i = 0; i < listInfo.length; i++) {
    const day = new Date(listInfo[i]?.dt * 1000).getDay();
    const temp = listInfo[i]?.temp?.day;
    const actualDay = days[day];
    const humidity = listInfo[i]?.humidity;
    const speedWind = listInfo[i]?.speed;
    const icon = listInfo[i].weather[0]?.icon;
    const src = getImageSrc(icon);
    const markup = `
        <div class="additional-info">
            <img src="${src}" alt="weather" />
            <div>${actualDay}</div>
            <div>${temp} C'</div>
            <div>${humidity} %'</div>
            <div>${speedWind} m/s'</div>
        </div>
    `;
    weekly.insertAdjacentHTML('beforeend', markup);
  }

}

document.getElementById('search').addEventListener('click', getWeather);
