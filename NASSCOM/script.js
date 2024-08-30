setInterval(drawClock, 2000);
    
function drawClock(){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    //Date
    var options = {year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    document.getElementById("date").innerHTML = today.toLocaleDateString("en-US", options);
    
    //hour
    var hourAngle = (360*(hour/12))+((360/12)*(minute/60));
    var minAngle = 360*(minute/60);
    document.getElementById("hour").style.transform = "rotate("+(hourAngle)+"deg)";
    //minute
    document.getElementById("min").style.transform = "rotate("+(minAngle)+"deg)";
 
    //Get Humidity Temperature and Rain Data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      var txt = this.responseText;
      var obj = JSON.parse(txt); //Ref: https://www.w3schools.com/js/js_json_parse.asp
        document.getElementById("rain").innerHTML = obj.Rain + "%";
        document.getElementById("temperature").innerHTML = Math.round(obj.Temperature) + "&deg;C";
        document.getElementById("temp").innerHTML = Math.round(obj.Temperature) + "&deg;C";
        document.getElementById("humidity").innerHTML = Math.round(obj.Humidity) + "%";
        document.getElementById("pressure").innerHTML = Math.round(obj.Pressuremb) + " mb";
      }  
    };
   xhttp.open("GET", "readADC", true); //Handle readADC server on ESP8266
   xhttp.send();
}