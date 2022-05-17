import React from 'react'
import './Header.css'
import Navbar from 'react-bootstrap/Navbar'

function Header() {
  return (
    <Navbar bg="dark" variant="dark" className="Header">
        <Navbar.Brand>
          <img 
            src="/octoRed.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Octo Red Icon"
            onClick={() => window.location.reload()}
          /> {' '}
          <span className="nav-title">CI Url Shortener</span>
        </Navbar.Brand>
    </Navbar>
  )
}

export default Header;