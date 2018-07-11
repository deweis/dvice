$(document).ready(function() {

  /* An array of cities with for initial page load and random fun */
  var arrCities = [{name: "Batman",country: "Illinois, US",longitude: 41.12928320000003,latitude: 37.8895167},
                   {name: "Cut Off",country: "Louisiana, US",longitude: -90.33813609999999,latitude: 29.5427168},
                   {name: "Ganja",country: "Azerbaijan",longitude: 46.36505126953125,latitude: 40.688135995956976},
                   {name: "Weed",country: "California, US",longitude: -122.38612690000002,latitude: 41.42264979999999},
                   {name: "Sandwich",country: "New Hampshire, US",longitude: -71.4104696,latitude: 43.79087029999999},
                   {name: "Normal",country: "Illinois, US",longitude: -88.9906312,latitude: 40.5142026},
                   {name: "Gotham",country: "England",longitude: -1.2066809000000376,latitude: 52.867954},
                   {name: "Drama",country: "Greece",longitude: 24.147079599999984,latitude: 41.149001},
                   {name: "Bath",country: "England",longitude: -69.82060230000002,latitude: 43.9106353},
                   {name: "Condom",country: "France",longitude: 0.37249199999996563,latitude: 43.9582229},
                   {name: "Cut and Shoot",country: "Texas, US",longitude: -95.35799399999996,latitude: 30.3332654},
                   {name: "Earth",country: "Texas, US",longitude: -102.410749,latitude: 34.233137},
                   {name: "Fair Play",country: "South Carolina, US",longitude: -82.98555829999998,latitude: 34.5113246}
                  ];
var randomEntry = Math.floor(Math.random() * arrCities.length-1) + 1;
  var urlJSON = 'https://fcc-weather-api.glitch.me/api/current?lon='+arrCities[randomEntry].longitude+'&lat='+arrCities[randomEntry].latitude;
  var temperature = 0;


  /* Get Data for Page Load */
  function getData(urlJSON) {
    $.getJSON(urlJSON, function(data) {
      $('#errorMessage').removeClass('alert alert-danger');
      $('#errorMessage').text('');
      $('#currentWeather').html('The current weather in <strong>'+data.name+' ('+data.sys.country+')</strong> looks like <strong>'+data.weather[0].description+'!</strong>').hide().fadeIn(1200);
      temperature = Math.round(data.main.temp);
      $('#temperature').html('<strong>'+temperature+' &#x2103</strong>').hide().fadeIn(1200);
      $('#temperature').attr('title','Click for Fahrenheit');
      $('#weatherIcon').attr('src',data.weather[0].icon).hide().fadeIn(1200);
    });
  }

  /* Load the first city at page load */
  getData(urlJSON);

  /* Load another random city from the fun array */
  $('#btnRandomWeather').click(function() {
     var randomCity = Math.floor(Math.random() * arrCities.length-1) + 1;
     urlJSON = 'https://fcc-weather-api.glitch.me/api/current?lon='+arrCities[randomCity].longitude+'&lat='+arrCities[randomCity].latitude;
     getData(urlJSON);
  });

  /* Clicked Button "Show my Weather" */
  $('#btnMyWeather').click(function() {
    //var x = document.getElementById("errorMessage");

    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getWeather,showError);
      } else {
        $('#errorMessage').addClass("alert alert-danger");
        $('#errorMessage').text("Unfortunately, Geolocation is not supported by your browser. Try it with a Random City instead.").hide().fadeIn(1200);
      }

    function getWeather(position) {
       urlJSON = 'https://fcc-weather-api.glitch.me/api/current?lon='+position.coords.longitude+'&lat='+position.coords.latitude;
       getData(urlJSON);
    }

    function showError(error) {
      switch(error.code) {
          case error.PERMISSION_DENIED:
              $('#errorMessage').addClass("alert alert-danger");
              $('#errorMessage').text('Please allow your browser to get your location.').hide().fadeIn(1200);
              break;
          case error.POSITION_UNAVAILABLE:
              $('#errorMessage').addClass("alert alert-danger");
              $('#errorMessage').text("Oops, sorry. Can't find your location.").hide().fadeIn(1200);
              break;
          case error.TIMEOUT:
              $('#errorMessage').addClass("alert alert-danger");
              $('#errorMessage').text("Oops, sorry. The request has been timed out. Try again.").hide().fadeIn(1200);
              break;
          case error.UNKNOWN_ERROR:
              $('#errorMessage').addClass("alert alert-danger");
              $('#errorMessage').text("An unknown error occurred.").hide().fadeIn(1200);
              break;
      }
    }

  });


  /* Function to switch between Celsius and Fahrenheit with click on temperature */
  $('#temperature').click(function(){
       var currentMetric = $("#temperature").html().substr(-10,1);
       /* Comparison based on ascii would be good !!*/
       if (currentMetric === '℃') {
           $('#temperature').html('<strong>'+Math.round(((temperature*9/5)+32))+' &#x2109<br>');
           $('#temperature').attr('title','Click for Celsius');
       }
       else {
           $('#temperature').html('<strong>'+temperature+' &#x2103</strong>');
           $('#temperature').attr('title','Click for Fahrenheit');
       }
  });

}); // end document ready