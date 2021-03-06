const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyparse = require('body-parser');
const cors = require('cors');
const City = require('./modules/City');
const Device = require('./modules/Device');
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/web'))

app.use('/cities', require('./controllers/cities'));
app.use('/devices', require('./controllers/devices'));
app.use('/users', require('./controllers/users'));
app.use('/weather', require('./controllers/weather'));

mongoose.connect('mongodb+srv://acdb2021:acdb2021@cluster0.eygdd.mongodb.net/nodeAppp').catch(error => { handleError(error); console.log(error); });

app.get('/', (req, res) => {
  res.sendFile('web/index.html', {root: __dirname});
});
app.get('/settings', (req, res) => {
  res.sendFile('web/settings.html', {root: __dirname});
});
app.get('/device', (req, res) => {
  res.sendFile('web/devices.html', {root: __dirname});
});
app.get('/add-device', (req, res) => {
  res.sendFile('web/add.html', {root: __dirname});
});

app.listen(3000);

setInterval(async function () {
  try {
    let device = await Device.findById("619386f56eab02bab508b09d");
    console.log(device.temp);
    
  } catch (err) {
    
  }
}, 5000);


// setInterval(async function () {
//   try {
//     let cities = await City.find();
//     cities.forEach(city => {
//       //console.log(city.name);
//       if (city.automatic == true) {
//         // quyosh chiqish, botish  vaqtini qurilmalara ham yozib qo`yadi
//         console.log(city.sunset);
//         function2(city);
//       }
//     });
//     console.log("");
//   } catch (error) {

//   }
// }, 5000);

async function function2(city) {
  await Device.updateMany({ cities: city._id, automatic2: true }, { ontime1: city.sunset });
  await Device.updateMany({ cities: city._id, automatic2: true }, { ontime2: city.sunset });
  await Device.updateMany({ cities: city._id, automatic2: true }, { ontime3: city.sunset });
  await Device.updateMany({ cities: city._id, automatic2: true }, { offtime1: city.sunrise });
  await Device.updateMany({ cities: city._id, automatic2: true }, { offtime2: city.sunrise });
  await Device.updateMany({ cities: city._id, automatic2: true }, { offtime3: city.sunrise });
}



// setInterval(async function () {
//   const cities = await City.find();
//   cities.forEach(city11 => {
//     try {
//       // request boshlanish joyi
//       var request = require("request");
//       var options = {
//         method: 'GET',
//         url: 'http://api.openweathermap.org/data/2.5/weather',
//         qs:
//         {
//           lat: city11.longitude,
//           lon: city11.latitide,
//           appid: 'bb85435372d63f24078b193721636dcb'
//         }
//       };

//       request(options, function (error, response, body) {
//         try {
//           var body1 = JSON.parse(body);
//            var sun = body1.sys;
//         } catch (error) {

//         }



//         var sunset1 = new Date((sun.sunset + 18000) * 1000);
//         var sunrise1 = new Date((sun.sunrise + 18000) * 1000);
//         // console.log(sunrise1);
//         // console.log(sunset1);
//         update1({ sunset: sunset1, sunrise: sunrise1, id: city11._id });
//       });
//     } catch (error) {
//       console.log("So`rov yuboroshda xatolik bor");
//     }


//   });
// }, 20000);

