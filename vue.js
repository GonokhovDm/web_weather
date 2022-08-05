const App = {
   data () {
      return {
         apiKey: '8ef2adb7778d4635a0521821220308',
         apiBase: 'http://api.weatherapi.com/v1/current.json',
         query: '',
         weather: {}
      }
   },

   methods: {
      fetchWeather(e) {
         if(e.key == "Enter") {
            fetch(`${this.apiBase}?key=${this.apiKey}&q=${this.query}&aqi=yes`)
               .then (res => {
                  return res.json();
               }).then(this.setResults);
         }
      },

      setResults (results) {
         this.weather = results;
      }
   }
}

Vue.createApp(App).mount('#root');
