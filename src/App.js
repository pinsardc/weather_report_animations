import './App.css';
import sun from './lib/sun.png';
import moon1 from './lib/moon1.png';
import moon2 from './lib/moon2.png';
import moon3 from './lib/moon3.png';
import moon4 from './lib/moon4.png';
import moon5 from './lib/moon5.png';
import moon6 from './lib/moon6.png';
import moon7 from './lib/moon7.png';
import moon8 from './lib/moon8.png';
import clouds from './lib/clouds.png';
import clouds2 from './lib/clouds2.png';
import rain from './lib/rain.mp4';
import rain2 from './lib/rain2.mp4';
import rain3 from './lib/rain3.mp4';
import { WEATHERAPI_KEY } from './env';

async function getMeteo() {
  // const url = "https://api.open-meteo.com/v1/forecast?latitude=48.951051&longitude=2.236607&hourly=temperature_2m&current=temperature_2m,is_day,rain,weather_code,wind_speed_10m,snowfall,cloud_cover&forecast_days=1";
  const url2 = "http://api.weatherapi.com/v1/current.json?key=" + WEATHERAPI_KEY + "&q=Paris";
  const response = await fetch(url2);
  const data = await response.json();
  console.log("SEND REQUEST FOR METEO")
  
  console.log("ICI :")
  console.log(data);
  return data.current;
}
const meteo = await getMeteo();
const code = meteo.condition.code;

async function getAstronomy() {
  // console.log(meteo.is_day);
  meteo.is_day = 0;
  if (!meteo.is_day) {
    const moonUrl = "http://api.weatherapi.com/v1/astronomy.json?key=" + WEATHERAPI_KEY + "&q=Paris"
    const moonResponse = await fetch(moonUrl);
    console.log("SEND REQUEST FOR MOON")
    const moonData = await moonResponse.json();
    console.log("moon :");
    console.log(moonData);
    return moonData;
  }
}
const astro = await getAstronomy();
const moonPhase = astro.astronomy.astro.moon_phase;
const moonPhases = {
  "New Moon": 1,
  "Waxing Crescent": 2,
  "First Quarter": 3,
  "Waxing Gibbous": 4,
  "Full Moon": 5,
  "Waning Gibbous": 6,
  "Last Quarter": 7,
  "Waning Crescent": 8
}

const moons = {
  1: moon1,
  2: moon2,
  3: moon3,
  4: moon4,
  5: moon5,
  6: moon6,
  7: moon7,
  8: moon8
}

function between(a, b, subj) {
  if (subj <= b && subj >= a) {
    return true;
  }
  return false;
}

function App() {
  return (
    <div className="App">
      <header className={"App-header " + ([0].includes(meteo.weather_code) ? '' : (meteo.is_day === 1 ? 'day' : 'night'))}>

      
      {(between(293, 314, code) || between(353, 359, code)) && <video className='videoTag' style={{zIndex: '1', padding: 'none', position: 'fixed'}} autoPlay loop muted>
            <source src={rain} type='video/mp4' />
        </video>}
        {between(1003, 1009, code) && <img src={clouds2} className="App-clouds" alt="clouds" />}
        {code === 1000 && !!meteo.is_day && <div className="App-sun-container2">
          <div className="App-sun-container">
            <img src={sun} className="App-sun" alt="sun" />
          </div>
        </div>}
        {!meteo.is_day && <div  className="App-moon-container">
          <div className="App-moon-container">
            <img src={moons[moonPhases[moonPhase]]} className="App-moon" alt="moon" />
          </div>
          </div>}
        <p style={{zIndex: '2'}}>
          {meteo.temp_c}°C
        </p>
      </header>

    </div>
  );
}

export default App;
