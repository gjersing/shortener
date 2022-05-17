import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './EntryForm.css'
import { useState } from 'react';
import axios from 'axios';

const ENDPOINT_URL = 'http://localhost:3000/';
const API_URL = 'http://localhost:3000/shorturls';

function EntryForm() {
  const [showLink, setShowLink] = useState([]);

  // Builds Link obj from submit and POSTs to RubyRails
  function buildLinkAndPost(data) {
    var form_url = data[0].value;
    var form_stub = data[1].value;

    // Validate stub submission, replace non-alphanumeric characters w/ Regex.
    var valid_stub = form_stub.replace(/[\W_]+/g,"");

    const builtUrl = {
      original_url: form_url,
      stub: valid_stub
    }
    console.log(builtUrl);

    axios.post(API_URL, builtUrl)
    .then(function (response) {
      if (response.status === 201) {
        console.log("Short Link successfully created.");
      }
      else {
        console.log(response);
      }
    })
    .catch(function (err) {
      if (err.request.responseText === "{\"stub\":[\"has already been taken\"]}") {
        console.log("Stub has already been taken!");
      }
      else {
        console.log(err);
      }
    });

    return valid_stub;
  }

  // Initial Form Submit Handler. Calls to build and post link then calls to show link.
  function handleSubmit(event) {
    event.preventDefault();
  
    let valid_stub = buildLinkAndPost(event.target);

    var linkRef = document.getElementById('link-ref');
    setShowLink(ENDPOINT_URL + valid_stub);
    var hrefLink = ENDPOINT_URL + valid_stub;
    linkRef.href = hrefLink;
    var shortenedUrlDiv = document.getElementById('shortened-url-div');
    shortenedUrlDiv.style.visibility = 'visible';
  }

  return (
    <div>
      <Form className="entry-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control required type="url" placeholder="Enter URL" contentEditable={true}/>
          <Form.Text className="text-muted">
            Enter valid URL to be shortened.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStub">
          <Form.Label>Optional Custom Stub</Form.Label>
          <Form.Control type="text" maxLength="8" placeholder="Enter Stub" />
          <Form.Text className="text-muted">
            Leave blank to autogenerate a 4 character stub.<br/>Only Alphanumeric characters (a-z, 0-9) are allowed. Max length is 8 characters.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" className="shorten-btn">
          Shorten
        </Button>
      </Form>
      <div className="url-show" id="shortened-url-div">
        Your generated URL:
        <a id='link-ref' href='http:/localhost:3000/'>{showLink}</a>
      </div>
    </div>
  )
}

export default EntryForm