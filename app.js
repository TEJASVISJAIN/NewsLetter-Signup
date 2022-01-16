const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
})



app.post("/", function(req,res){
  const fn = req.body.fn;
  const ln  = req.body.ln;
  const email = req.body.email;

  const data={
    members:[{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fn,
          LNAME: ln,
        }
    }]
  }
  const jsonData = JSON.stringify(data);

  const options = {
    method: "POST",
    auth: "tejasvi:e9732659ed9b32ceb2142e722db5bd3a-us20"
  }

  const url = "https://us20.api.mailchimp.com/3.0/lists/b97ce045cb" ;

const request = https.request(url, options, function(response){
      if(response.statusCode == 200){
        
        res.sendFile(__dirname + "/success.html");
        // res.send("Subscription Successful");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
        // res.send("Failed to Subscribe");
      }
      response.on("data", function(data){
        console.log(JSON.parse(data));
      })
})

request.write(jsonData);
request.end();

})
app.post("/failure", function(req, res){
  res.redirect("/");
})




app.listen(process.env.PORT || port, function(){
  console.log("server is running on port", port);
})

//API KEY
// e9732659ed9b32ceb2142e722db5bd3a-us20

//List ID
//b97ce045cb