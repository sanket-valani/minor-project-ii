const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const LanguageDetect = require('languagedetect');
const express = require('express');
const util = require('util');
const fetch = require("node-fetch");

const app = express()
const port = 9090
const lngDetector = new LanguageDetect();
const ProjectID = 'bvm-minor-project-2'
const CropPredictionServiceURL = 'http://127.0.0.1:8000/api/';
const OpenWeatherApiKey = "ApiKey";

const CropPredictionService = async ( cropName, predictDays ) => {
  try {
    let answer = await fetch(CropPredictionServiceURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        crop_name: cropName,
        days: predictDays
      }),
    }).then((response)=> response.json()).then((responseJSON)=>{
      console.log("ANSWER: ", responseJSON.answer);
      return  responseJSON.answer;
    });
    return answer;
  } catch (err) {
    console.log('Error in fetch call ',err);
  }
}

const WeatherApiCaller = async ( cityName ) => {
  let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OpenWeatherApiKey}&units=metric`
  try {
    let answer = await fetch(queryUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response)=> response.json()).then((responseJSON)=>{
      return responseJSON;
    });
    return answer;
  } catch (err) {
    console.log('Error in fetch call ',err);
  }
}

const API_Caller = async (inputQuery, inputQueryLanguage) => {
  try {
    
    const sessionId = uuid.v4();
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.projectAgentSessionPath(ProjectID, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: inputQuery,
          languageCode: inputQueryLanguage,
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);

    // Weather | TESTED
    if(responses[0].queryResult.intent.displayName == "weather"){
      console.log("Intent identified as: weather");
      let cityName =  responses[0].queryResult.parameters.fields["geo-city"].stringValue;
      let answer = await WeatherApiCaller(cityName);
      if(answer.cod === 404){
        return "City name not found";
      } else if(answer.cod === 200){
        let text = `Weather Report:\nCity: ${cityName}\nDescription: ${answer.weather["0"].description}\nTemperature: ${answer.main.temp}°C\nHumidity: ${answer.main.humidity}%\nWind Speed: ${answer.wind.speed}m/s\nWind direction: ${answer.wind.deg}° from North`;
        return text;  
      } else {
        console.log("Error: ",answer);
        return "Error in Openweather API";
      }
    }
    // Current prices | TESTED
    else if(responses[0].queryResult.intent.displayName == "currentprice"){
      console.log("Intent identified as: current prices");
      const result = responses[0].queryResult;
      console.log("Response: ",result.fulfillmentText);
      return result.fulfillmentText;  
    }
    // Crop Prediction Intent
    else if(responses[0].queryResult.intent.displayName == "crop-prediction"){
      console.log("Intent identified as: crop prediction");

      let cropName = responses[0].queryResult.parameters.fields.cropname.listValue.values[0].stringValue;
      let predictDays = responses[0].queryResult.parameters.fields["date-time"].stringValue;      
      predictDays = (Math.abs(new Date(predictDays.toString().substr(0,10)) - new Date( new Date().toISOString().substr(0,10) )))/(1000*3600*24);

      let answer = await CropPredictionService(cropName,predictDays);
      let text="";
      answer.forEach((value,key)=>{
        text += value["date"]+" -> ₹"+value["price"].toString().substr(0,7)+"/Quintal \n";
      })
      text = "Predicted price of "+ cropName +" is \n" + text;
      return text.trim();  
    }
    else {
      const result = responses[0].queryResult;
      console.log("Response: ",result.fulfillmentText);
      return result.fulfillmentText;  
    }

  } catch (error) {
    console.log("Error while calling API \n"+error);
    return "Error occured at while processing query";
  }
}

let requestCounter = 0;
app.get('/', (req, res) => {
  let inputQuery = req.query['q'];
  if(inputQuery === ""){
    res.json({response:"Empty String Error"});
  }
  let languages = lngDetector.detect(inputQuery,1);
  let time = new Date();
  console.log('Request No: '+(requestCounter++)+'  Time: '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds());
  console.log('Request: '+inputQuery);
  console.log('Languages detected: '+ languages);
  if( languages.length === 0){
    API_Caller(inputQuery,'en-US').then(result=>{
      res.json({response:result});
    });
  } else if( languages[0][0] === 'hindi' ){
    API_Caller(inputQuery,'hi').then(result=>{
      res.json({response:result});
    });
  } else {
    API_Caller(inputQuery,'en-US').then(result=>{
      res.json({response:result});
    });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})