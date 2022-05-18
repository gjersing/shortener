import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './EntryForm.css'
import { useState } from 'react';
import axios from 'axios';
import { HiOutlineClipboardCopy } from 'react-icons/hi';

const ENDPOINT_URL = 'http://localhost:3000/';
const API_URL = 'http://localhost:3000/shorturls';

/*
EntryForm() returns a form with URL and Stub inputs.
On form submit we call buildLinkAndPost() which creates an object and makes the POST request.
showResult() is called within buildLinkAndPost and showcases generated URL or error msg.
*/
function EntryForm() {
  const [showLink, setShowLink] = useState([]);
  const [isCopyIconDisplayed, setCopyIconDisplay] = useState(false);
  const [isUrlMsgDisplayed, setUrlMsgDisplay] = useState(false);
  const [isResultVisible, setResultVisibility] = useState(false);

  // Grabs link text and copies to clipboard. Changes icon color to signal operation to user.
  function copyLinkToClipboard() {
    var copyText = document.getElementById('link-ref');
    var copyIcon = document.getElementById('copy-icon');
    navigator.clipboard.writeText(copyText.href);
    copyIcon.style.color = '#0275d8';
    setTimeout(function() {
      copyIcon.style.color = 'white';
    }, 100);
  }
  // Makes result div visible and shows successful link, stub error, or a generic error message.
  function showResult(finalStub) {
    setResultVisibility(true);
    var linkRef = document.getElementById('link-ref');

    // Only populated if POST returns a 201 status. Otherwise error output.
    if (finalStub) {
      setUrlMsgDisplay(true);
      setShowLink(ENDPOINT_URL + finalStub);
      var hrefLink = ENDPOINT_URL + finalStub;
      linkRef.href = hrefLink;
      setCopyIconDisplay(true);
    }
    else {
      setUrlMsgDisplay(false);
      setCopyIconDisplay(false);
      linkRef.href = '/'
    }
  }

  // Builds Link obj from submit and POSTs to RubyRails
  function buildLinkAndPost(data) {
    var form_url = data[0].value;
    var form_stub = data[1].value;

    // Validate stub submission, replace non-alphanumeric characters w/ Regex.
    var valid_stub = form_stub.replace(/[\W_]+/g,"");
    valid_stub = valid_stub.trim();

    // If no stub provided, generate a random alphanumeric string to act as stub.
    if (!valid_stub) {
      valid_stub = Math.random().toString(36).slice(2,6);
    }

    const builtUrl = {
      original_url: form_url,
      stub: valid_stub
    }

    let finalStub = null;

    axios.post(API_URL, builtUrl)
    .then(function (response) {
      // POST Success. 201 is 'CREATED' and is common success return.
      if (response.status === 201) {
        finalStub = valid_stub;
        showResult(finalStub);
      } else {
        showResult(finalStub);
      }
    })
    .catch(function (err) {
      // Special error message for Stub collisions.
      if (err.request.responseText === "{\"stub\":[\"has already been taken\"]}") {
        var stubTakenErrMessage = "Stub has already been taken. Please use a different stub.";
        setShowLink(stubTakenErrMessage);
        showResult(finalStub);
      }
      else {
        console.log(err);
        var generalErrMessage = "An error has occurred. See console log for further information.";
        setShowLink(generalErrMessage);
        showResult(finalStub);
      }
    });
  }

  // Initial Form Submit Handler. Calls to build and post link then calls to show link.
  function handleSubmit(event) {
    event.preventDefault();
    buildLinkAndPost(event.target);
  }

  // Component HTML. Input Form + Results Div
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
            Leave blank to autogenerate a 4 character stub.<br/>
            Only Alphanumeric characters (a-z, 0-9) are allowed. Max length is 8 characters.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" className="shorten-btn">
          Shorten
        </Button>
      </Form>
      <div className="url-show" id="shortened-url-div" 
        style={isResultVisible ? {visibility: 'visible'} : {visibility: 'hidden'}}>
        <div id='url-msg' 
          style={isUrlMsgDisplayed ? {display: 'block'} : {display: 'none'}}>
        Your Generated URL:
        </div>
        <a className='link-ref' id='link-ref' href='/'>{showLink}</a>
        <HiOutlineClipboardCopy 
          size={32} 
          className='copy-icon' id='copy-icon' 
          onClick={copyLinkToClipboard} 
          style={isCopyIconDisplayed ? {display: 'block'} : {display: 'none'}}
        />
      </div>
    </div>
  )
}

export default EntryForm