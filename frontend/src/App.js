import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Header from './components/Header';
import EntryForm from './components/EntryForm';
import Footer from './components/Footer';

function App() {

  return (
    <div className="App">
      <Header />
      <EntryForm />
      <Footer />
    </div>
  );
}

export default App;
