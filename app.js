//Reference Express GET and POST
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const port=3000;

const app = express();

// static files to reflect on page
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/",function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const f_Name = (req.body.fName);
  const l_Name =(req.body.lName);
  const email_ID = (req.body.emailID);
  //console.log(f_Name+" "+l_Name+" "+email_ID);
  //res.send("First Name is " + f_Name + "Last Name is " + l_Name + "Email ID is " + email_ID );
  var data ={
    members: [
      {
        email_address: email_ID,
        status: "subscribed",
        merge_fields:{
          FNAME: f_Name,
          LNAME: l_Name,
        }
      }
    ]
  };
  const jsonData= JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/0c1a4e1049"
  const options = {
    method: "POST",
    auth: "SudheerPula:adbf5cee3342913f76ed0d9dc37aa3bad-us14"
  }
  const request = https.request(url,options,function(response){
      if( response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
        //res.send("Sucessfully subscribed");
      } else{
        res.sendFile(__dirname+"/failure.html");
        //res.send("There is an error with signing up, please try again!");
      }

      response.on("data", function(data){
      //  console.log(JSON.parse(data));
      })
  })
  request.write(jsonData);
  request.end();

})

app.post("/failure",function(req,res){
  res.redirect("/")
})
app.listen(process.env.PORT||port, () => {
  //console.log(`Server app listening on port ${port}`)
})

//API Key
// dbf5cee3342913f76ed0d9dc37aa3bad-us14

//Audience ID
// 0c1a4e1049
