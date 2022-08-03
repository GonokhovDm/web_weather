const link = "http://api.weatherapi.com/v1/current.json?key=8ef2adb7778d4635a0521821220308&q=Novosibirsk&aqi=yes";

const root = document.getElementById('root');

let store = {
   city: "Novosibirsk",
   feelslike: 0,
   cloud: 0,
   temp: 0,
   humidity: 0,
   pressure: 0,
   uv: 0,
   visKm: 0,
   isDay: 0,
   condition: "",
   windKm: 0,
   windDir: ""
};

const fetchData = async () => {
   const result = await fetch(`${link}&query=${store.city}`);
   const data = await result.json();

   const {
      current: {
         feelslike_c : feelslike,
         cloud,
         temp_c : temp,
         humidity,
         pressure_in : pressure,
         uv,
         vis_km : visKm,
         is_day : isDay,
         condition,
         wind_kph : windKm,
         wind_dir : windDir
      },
   } = data;
   
   store = {
      ...store,
      feelslike,
      cloud,
      temp,
      humidity,
      pressure,
      uv,
      visKm,
      isDay,
      condition: condition[2],
      windKm,
      windDir
   };
   // renderComponent();
};

const renderComponent = () => {
   root.innerHTML = `${store.temp}°C`;
};

fetchData();