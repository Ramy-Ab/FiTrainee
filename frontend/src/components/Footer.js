import React from "react";
import "./Footer.css";
import logo from "../images/logo.png";

function Footer() {
  return (
    <div>
      <section className="contact-area" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="contact-content text-center">
                <a href="#">
                  <img src={logo} alt="logo" />
                </a>

                <div className="hr"></div>
                <h6>A coté Station Naftal Boukhadra, El bouni, Annaba.</h6>
                <h6>
                  +213 656267769<span></span>
                </h6>
                <div className="contact-social">
                  <ul className="mb-1">
                    <li>
                      <a className="hover-target" href="">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a className="hover-target" href="">
                        <i className="fab fa-pinterest-p"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>
          Copyright &copy; 2021 <img src={logo} alt="logo" /> All Rights
          Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Footer;
