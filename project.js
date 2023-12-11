document.getElementById("city").addEventListener("change", loadCity);
// when the element with id "city" changes, it calls the function loadCity
function loadCity() {
  var selectedCity = document.getElementById("city").value; // adding value from the city id to this variable

  //if a city is selected, creates the XMLHTTPRequest, sends the request and fetches data from Finnkino APIUrl.
  if (selectedCity) {
    var xmlhttp = new XMLHttpRequest();
    var finnkinoApiUrl =
      "http://www.finnkino.fi/xml/Schedule/?area=" + selectedCity; //To URl added area + selectedCity variable so we get the data from chosen area

    xmlhttp.open("GET", finnkinoApiUrl, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        // checking the request is ready, 4 = request finished and response is ready, 200 = "OK"

        var xmlDoc = xmlhttp.responseXML; // parsing the XML response

        var showInfo = xmlDoc.getElementsByTagName("Show"); // getting "Show" element from the XML
        var tableHtml = // building the HTML table
          "<table border='1'><tr><th>Title</th><th>Theatre</th><th>Show Time</th><th>Genre</th><th>Poster</th></tr>";

        for (var i = 0; i < showInfo.length; i++) {
          var title = showInfo[i].getElementsByTagName("Title")[0].textContent;
          var theatre =
            showInfo[i].getElementsByTagName("Theatre")[0].textContent;
          var dttmShowStart =
            showInfo[i].getElementsByTagName("dttmShowStart")[0].textContent;
          var genres =
            showInfo[i].getElementsByTagName("Genres")[0].textContent;
          var EventSmallImagePortrait = showInfo[i].getElementsByTagName(
            "EventSmallImagePortrait"
          )[0].textContent; // --> get each piece of information by the tag name from the XML data

          tableHtml += // add a new row to the table for each information
            "<tr><td>" +
            title +
            "</td><td>" +
            theatre +
            "</td><td>" +
            dttmShowStart +
            "</td><td>" +
            genres +
            "</td><td><img src='" +
            EventSmallImagePortrait +
            "' alt='EventSmallImagePortrait'></td></tr>";
        }

        tableHtml += "</table>"; // closing the table and inserts the results here where id "data" is in HTML
        document.getElementById("data").innerHTML = tableHtml;
      }
    };
  } else {
    // when no city is selected, text to ask a city appears
    document.getElementById("data").innerHTML = "Choose a city from the list";
  }
}
