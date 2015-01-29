var url = 'https://api.wunderground.com/api/cdc0bcea7d842ff8/forecast/q/90210.json';
var cityUrl = 'http://api.wunderground.com/api/cdc0bcea7d842ff8/geolookup/q/90210.json'
var zipCode;

// ajax call 1
getJSON(url, function(res){
  var initialData = res.forecast.simpleforecast.forecastday;
  document.querySelector('.container').appendChild(createContainerDiv(initialData));

});

// ajax call two
getJSON(cityUrl, function(res){
    var cityState = res.location.city + ", " + res.location.state;
    var heading = document.querySelector('h1');
    heading.appendChild(createCityStateHeading(cityState));
});

function createCityStateHeading(cityState){
  var docFragment = document.createDocumentFragment();

  var h1 = document.createElement('H1');
  docFragment.appendChild(h1);
  var text = document.createTextNode("Four Day Forecast: ");
  h1.appendChild(text);

  var h3 = document.createElement('H3');
  docFragment.appendChild(h3);
  var text_0 = document.createTextNode(cityState);
  h3.appendChild(text_0);

  return docFragment;

}


function createContainerDiv(objectArray) {
  var docFragment = document.createDocumentFragment();

  _.forEach(objectArray, function(obj){
    var ul = document.createElement('ul');
    
    var highTemp = obj.high.fahrenheit;
    var lowTemp = obj.low.fahrenheit;
    var condition = obj.conditions;
    var dayOfWeek = obj.date.weekday;
    var icon_url = obj.icon_url;
    
    // day of week
    var li_day = document.createElement('li');
    var h2 = document.createElement('h2');
    var h2_text = document.createTextNode(dayOfWeek);
    h2.appendChild(h2_text );
    li_day.appendChild(h2);
    ul.appendChild(li_day);
    
    
    // icon
    var li_icon = document.createElement('li');
    var img = document.createElement('img');
    img.setAttribute("src", icon_url);
    li_icon.appendChild(img);
    ul.appendChild(li_icon);
    
    // temp
    var li_highTemp = document.createElement('li');
    var text_temp = document.createTextNode("high/low: " + highTemp + "/" + lowTemp);
    li_highTemp.appendChild(text_temp);
    ul.appendChild(li_highTemp);
   
    
    // condition
    var li_condition = document.createElement('li');
    var text_condition = document.createTextNode("condition: " + condition);
    li_condition.appendChild(text_condition);
    ul.appendChild(li_condition);
    
    docFragment.appendChild(ul);
  })
  
  return docFragment;
  
}


function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  
  xhr.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    }
  };
  
  xhr.send()
}


//////////////////////////////////////////////////////////////////
// event handler for input/submit
//////////////////////////////////////////////////////////////////

document.querySelector('.submit').addEventListener('click', function(event){
    var zipCodeInput = document.querySelector('.zip').value;
  // on click want to get the zip code out of the input box
  // and change the url
  var updatedUrl = 'https://api.wunderground.com/api/cdc0bcea7d842ff8/forecast/q/' + zipCodeInput + '.json';
  
  getJSON(updatedUrl, function(res){
     var initialData = res.forecast.simpleforecast.forecastday;
    // first delete old dom
     var container = document.querySelector('.container');
     while(container.firstChild) {
     	container.removeChild(container.firstChild);
     }
     document.querySelector('.container').appendChild(createContainerDiv(initialData));
  });


  var updatedCityUrl = 'http://api.wunderground.com/api/cdc0bcea7d842ff8/geolookup/q/'+ zipCodeInput + '.json'

  getJSON(updatedCityUrl, function(res){
    var cityState = res.location.city + ", " + res.location.state;
    var heading = document.querySelector('h1');

    while(heading.firstChild) {
      heading.removeChild(heading.firstChild);
    }

    heading.appendChild(createCityStateHeading(cityState));

  });
});












