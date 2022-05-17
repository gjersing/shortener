import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:3000/shorturls';

const newUrl = {
  original_url: 'https://react-bootstrap.github.io',
  stub: 'rctbs'
}

const postShortUrl = newUrl => event => {
  console.log(newUrl)
  console.log(newUrl.original_url)

  axios.post(API_URL, {
    original_url: newUrl.original_url,
    stub: newUrl.stub
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  });
}

function App() {

  return (
    <div className="App">
      <Button onClick={() => console.log(newUrl)}>API POST Test</Button>
      <Button onClick={postShortUrl(newUrl)}>API POST Test</Button>
    </div>
  );
}

export default App;
