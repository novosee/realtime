
var container = document.getElementById('visualization');
var database;

firebasesetup();

var dnow = new Date();


lodaTimeline(2017, 6, dnow.getDate(), 18, 0, 2017, 6, dnow.getDate(), 23, 1);
lodaTimeline(2017, 6, dnow.getDate() - 1, 18, 0, 2017, 6, dnow.getDate() - 1, 23, 1);
lodaTimeline(2017, 6, dnow.getDate() - 2, 18, 0, 2017, 6, dnow.getDate() - 2, 23, 1);
lodaTimeline(2017, 6, dnow.getDate() - 3, 18, 0, 2017, 6, dnow.getDate() - 3, 23, 1);
lodaTimeline(2017, 6, dnow.getDate() - 4, 18, 0, 2017, 6, dnow.getDate() - 4, 23, 1);


function firebasesetup() {
  // Start Firebase
  var config = {
    apiKey: "AIzaSyA-VyZJOZVqXZj82wvVMkfJedDEhqXcIh8",
    authDomain: "novosee-a7bad.firebaseio.com",
    databaseURL: "https://novosee-a7bad.firebaseio.com",
    storageBucket: "novosee-a7bad.appspot.com",
    messagingSenderId: "363965061200"
  };
  firebase.initializeApp(config);
  database = firebase.database();
}


function lodaTimeline(syear, smonth, sday, shours, sminutes, eyear, emonth, eday, ehours, eminutes) {
  var dataset = new vis.DataSet();
  var now = new Date();
  var utcoffset = now.getTimezoneOffset() * 60000;
  var options = {
    start: Date.UTC(syear, smonth - 1, sday, shours, sminutes, 0, 0) + utcoffset,//vis.moment().add(-3, 'hours'), // changed so its faster
    end: Date.UTC(eyear, emonth - 1, eday, ehours, eminutes, 0, 0) + utcoffset,//vis.moment(),
    orientation: 'top',
  };
  var graph2d = new vis.Graph2d(container, dataset, options);
  var ref = database.ref("vivid");
  //Date.UTC(year, month(0-11), day, hours, minutes, seconds, millisec)
  ref.orderByChild("time").startAt(Date.UTC(syear, smonth - 1, sday, shours, sminutes, 0, 0) + utcoffset).endAt(Date.UTC(eyear, emonth - 1, eday, ehours, eminutes, 0, 0) + utcoffset).on("child_added", gotAll, errData);

  //ref.orderByChild("time").limitToLast(50).on("child_added", gotAll, errData);
  // The data comes back as an object
  function gotAll(gdata) {
    var sd = {};
    sd.x = new Date(gdata.val().time).toString();
    sd.y = gdata.val().count;
    dataset.add(sd);
    //console.log(sd.x);

  }

  function errData(error) {
    console.log("Something went wrong.");
    console.log(error);
  }
}

