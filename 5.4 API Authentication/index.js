import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Kun9p";
const yourPassword = "123456";
const yourAPIKey = "4cf5cf9a-59a9-4619-a609-132434ec9417";
const yourBearerToken = "c4221448-d0d9-4f95-ab38-68954adcb08e";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  const random = await axios.get("https://secrets-api.appbrewery.com/random");
  //console.log(random.data);
  const result = JSON.stringify(random.data);
  console.log(result);
  res.render('index.ejs', {content: result});
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  try {
    const all = await axios.get(API_URL + "all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = JSON.stringify(all.data);   
    res.render("index.ejs", { content: result });
  } catch (error) {
    res.status(404).send(error.message);
  }

  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
    
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  const filteredData = await axios.get(API_URL + "filter?score=5&apiKey=" + yourAPIKey);
  const result = JSON.stringify(filteredData.data);
  res.render("index.ejs", { content: result });
});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */

  const secretsIdData = await axios.get(API_URL + 'secrets/42', {
    headers: {
      Authorization: 'Bearer ' + yourBearerToken,
    }
  });
  const result = JSON.stringify(secretsIdData.data);
  res.render("index.ejs", { content: result });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});