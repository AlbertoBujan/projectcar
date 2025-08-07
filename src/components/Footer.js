import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <img src="/assets/logo_pequeño.png" alt="logo" />

      <div className="linkedin">
        <a href="https://www.linkedin.com/in/alberto-bujan/">
          Alberto Buján<img src="/assets/linkedin.png" alt="linkedin"></img>
        </a>
        <a href="https://www.linkedin.com/in/aitor-le%C3%B3n-a%C3%B1%C3%B3n-89748714b/">
          Aitor León<img src="/assets/linkedin.png" alt="linkedin"></img>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
