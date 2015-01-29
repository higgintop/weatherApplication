var url = 'https://api.wunderground.com/api/cdc0bcea7d842ff8/forecast/q/90210.json';
var zipCode;

getJSON(url, function(res){
  var initialData = res.forecast.simpleforecast.forecastday;
  document.querySelector('.container').appendChild(createContainerDiv(initialData));

});


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
// event handler to get the zipcode from input box
document.querySelector('.submit').addEventListener('click', function(event){
    var zipCodeInput = document.querySelector('.zip').value;
  // on click want to get the zip code out of the input box
  // and change the url
  console.log("zip code = " + zipCode); 
  var updatedUrl = 'https://api.wunderground.com/api/cdc0bcea7d842ff8/forecast/q/' + zipCodeInput + '.json';
  console.log("url: " + updatedUrl);
  getJSON(updatedUrl, function(res){
     var initialData = res.forecast.simpleforecast.forecastday;
    // first delete old dom
     var container = document.querySelector('.container');
     while(container.firstChild) {
     	container.removeChild(container.firstChild);
     }
     document.querySelector('.container').appendChild(createContainerDiv(initialData));
  });
});












