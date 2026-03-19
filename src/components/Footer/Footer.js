import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.195655060411!2d-58.572421!3d-34.599234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb826274488b3%3A0x6a2c270d4f6a70a!2zTWFydMOtbiBNaWd1ZW5zIDY4NjQsIEIxNjgyQU9YIFZpbGxhIEJvc2NoLCBQcm92aW5jaWEgZGUgQnVlbm9zIEFpcmVz!5e0!3m2!1ses!2sar!4v1700000000000"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          
          <div className="footer-info">
            <div className="info-item">
              <i className="material-icons">email</i>
              <div className="text">
                <label>MAIL</label>
                <p>tensoresfosters@gmail.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <i className="material-icons">call</i>
              <div className="text">
                <label>TELÉFONO</label>
                <p>+54 11-6410-1889</p>
              </div>
            </div>
            
            <div className="info-item">
              <i className="material-icons">location_on</i>
              <div className="text">
                <label>DIRECCIÓN COMERCIAL</label>
                <p>Martín Miguens 6864, Villa Bosch, Bs. As.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;