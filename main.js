const express = require('express')
const app = express()
const path=require('path')
var bodyParser = require('body-parser')
const Nexmo = require('nexmo')
var dir = path.join(__dirname,'public')

const port = 3000
app.use(express.static(dir))
app.use( bodyParser.json() )      // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}))

//declaring variables for msg
const nexmo = new Nexmo({
 apiKey: '302b6cbb',
 apiSecret: 'o9FsSxNeJsV5WPiO',
})
const from = 'SmartBags';
const to = '917500292638';
const text = 'your loved once are in danger';
const theftString = 'Alert Msg! check your bag';
//msg variable end

//declaring variables for gps
var lat=23.177102;
var lng=80.024780;
var es;
var ack=0;
//declaring ends


app.use((req,res,next) => {
res.header('Access-Control-Allow-Origin', "*");
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept');

next();
})


// for emergency switch





//for gps routes
app.use('/gps', (req, res) => {
  //console.log(req.body);
  /*console.log("gps route activated");
  console.log(req.body);*/
  var coords=JSON.stringify(req.body);
  /*console.log(coords)
  lat=coords.lat;
  lng=coords.lng;
  console.log(lat);
  console.log(lng);
*/

}
)


//sendcoords
app.use('/sc',(req,res) => {
  lat=lat+0.0001;
  lng=lng+0.0001
console.log("coords sent");
res.send('{"lat":'+lat+',"lng":'+lng+'}');
})




app.use('/track',(req,res) => {
console.log("track request arrived");
res.sendFile(path.resolve(__dirname, './track.html'))


})


app.use('/nearby',(req,res) => {
console.log("track request arrived");
res.sendFile(path.resolve(__dirname, './nearby.html'))


})




/*app.use('/setgps', (req, res) => {
res.sendFile(path.resolve(__dirname, './live.html'))
}
)

app.use('/getgps', (req, res) => {
res.set('Content-Type', 'text/plain');
res.send('{"lat":'+lati+',"lng":'+ longi +'}');
}
)

*/




app.use('/theftmsg',(req,res) => {
console.log("data");
console.log(req.body);
nexmo.message.sendSms(from, to, theftString);
console.log("theft message sent");
ack=1;
res.send('{"msg":'+ack+'}');
})


//route for sending msg
app.use('/sms', (req, res) => {
nexmo.message.sendSms(from, to, text);
console.log("sent");
}
)
//msg sending route ends


app.use('/track', (req, res) => {
res.sendFile(path.resolve(__dirname, './track.html'))
}
)

app.use('*', (req, res) => {
console.log("reuest arrived");
console.log(typeof(req.body))
console.log(JSON.stringify(req.body))
//res.send("test1")
res.sendFile(path.resolve(__dirname, './image.html'))
}
)

app.listen(process.env.PORT||5000,function(){
  console.log("ON BABY!!!!");
});
