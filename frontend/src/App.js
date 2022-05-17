import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Header from './components/Header';
import EntryForm from './components/EntryForm';
import Footer from './components/Footer';

const Backend_URL = 'http://localhost:3000/';
const API_URL = 'http://localhost:3000/shorturls';

const newUrl = {
  original_url: 'https://www.youtube.com',
  stub: 'yt'
}

const postShortUrl = newUrl => event => {
  console.log(newUrl)
  console.log(newUrl.original_url)

  axios.post(API_URL, {
    original_url: newUrl.original_url,
    stub: newUrl.stub
  })
  .then(function (response) {
    if (response.status === 201) {
      console.log("Short Link successfully created.");
      const madeUrl = Backend_URL + response.data.stub;
      console.log(madeUrl)
    }
    console.log(response);
  })
  .catch(function (err) {
    if (err.request.responseText === "{\"stub\":[\"has already been taken\"]}") {
      console.log("Stub has already been taken!");
    }
    else {
      console.log(err)
    }
  });
}

function App() {

  return (
    <div className="App">
      <Header />
      <EntryForm />
      <Button onClick={postShortUrl(newUrl)}>API POST Test</Button>
      <Footer />
    </div>
  );
}

export default App;
