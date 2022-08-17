// async function success(position) {
//    let coords = position.coords;

//    console.log(`latitude: ${coords.latitude}`);
//    console.log(`longitude: ${coords.longitude}`);

//    const result = await fetch(`http://api.weatherapi.com/v1/current.json?key=8ef2adb7778d4635a0521821220308&q=${coords.latitude},${coords.longitude}&aqi=yes`);
//    const data = await result.json();

//    console.log(`Your city is: ${data.location.name}?`);
// }

// function error(err) {
//    let message = 'try later';
//    console.warn(`ERROR(${err.code}): ${message}`);
// }

// let options = {
//    enableHighAccuracy: true,
//    timeout: 3000
// }

// navigator.geolocation.getCurrentPosition(success, error, options);

// ******************************************* //
// ****************   VUE   ****************** //
// ******************************************* //
const App  = {
   data () {
      return {
         apiKey: '8ef2adb7778d4635a0521821220308',
         apiBase: 'http://api.weatherapi.com/v1/current.json',
         query: '',
         weather: {},
         errors: [],
         conditionText: '',
         conditionCode: '',
         isDay: 0
      }
   },

   mounted() {
      this.$nextTick (function() {
         navigator.geolocation.getCurrentPosition(success, error);

         async function success(position) {
            let coords = position.coords;
         
            console.log(`latitude: ${coords.latitude}`);
            console.log(`longitude: ${coords.longitude}`);
         
            const result = await fetch(`http://api.weatherapi.com/v1/current.json?key=8ef2adb7778d4635a0521821220308&q=${coords.latitude},${coords.longitude}&aqi=yes`);
            const data = await result.json();

            console.log(`City: ${data.location.name}`); 
            console.log(`Condition: ${data.current.condition.text}`); 
            console.log(`Day: ${data.current.is_day}`);      
         }
         
         function error(err) {
            let message = 'try later';
            console.warn(`ERROR(${err.code}): ${message}`);
         }
      })
   },
   
   // computed: {
   //    yourCity() {
   //       navigator.geolocation.getCurrentPosition(success);
         
   //       async function success(position) {
   //       let coords = position.coords;
   //       const result = await fetch(`http://api.weatherapi.com/v1/current.json?key=8ef2adb7778d4635a0521821220308&q=${coords.latitude},${coords.longitude}&aqi=yes`);
   //       const data = await result.json();
   //       console.log(`Your city is: ${data.location.name}?`);
   //       return data.location.name;
   //       }
   //    }
   // },  

   methods: {
      async fetchWeather(e) {
         try {
            if(e.key == "Enter") {
               await fetch(`${this.apiBase}?key=${this.apiKey}&q=${this.query}&aqi=yes`)
                  .then (res => {
                     return res.json();
                  }).then(this.setResults); 
                  
             
            }
         } catch (error) {
            this.errors.push(error);
         }
      },

      setResults (results) {
         let bg = document.getElementById('app');
         this.weather = results;
         this.conditionText = results.current.condition.text;
         this.isDay = results.current.is_day;

         console.log(this.conditionText, this.isDay); 
         
         function bgChange() {
            if (results.current.is_day == 1) {
               if (results.current.condition.text == "Light rain") {
                  bg.style.backgroundImage = "url('img/bg/rain_day.jpg')";
               }
               else if (results.current.condition.text == "Sunny") {
                  bg.style.backgroundImage = "url('img/bg/sun_day.jpg')"
               }
               else if (results.current.condition.text == "Overcast") {
                  bg.style.backgroundImage = "url('img/bg/cloud_day.jpg')"
               }
               else {
                  bg.style.backgroundImage = "url('img/bg/other.jpg')"
               }
            }
            else {
               if (results.current.condition.text == "Light rain") {
                  bg.style.backgroundImage = "url('img/bg/rain_night.jpg')"
               }
               else if (results.current.condition.text == "Sunny") {
                  bg.style.backgroundImage = "url('img/bg/sun_night.jpg')"
               }
               else if (results.current.condition.text == "Overcast") {
                  bg.style.backgroundImage = "url('img/bg/cloud_night.jpg')"
               }
               else {
                  bg.style.backgroundImage = "url('img/bg/other.jpg')"
               }
            }
         }
         
         bgChange();
         
      }
   },
}

Vue.createApp(App).mount('#root');