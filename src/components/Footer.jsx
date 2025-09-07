import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        © {new Date().getFullYear()} Ahmad Ozair Yousufi. All rights reserved.
      </p>
      <p className="footer-text">
        <a href="mailto:ozairyousufi1400@gmail.com" className="footer-link">
          ozairyousufi1400@gmail.com
        </a>{" "}
        |UK
      </p>
    </footer>
  );
}

export default Footer;
