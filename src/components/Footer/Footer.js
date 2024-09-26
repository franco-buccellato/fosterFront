import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <section className="maps container">
      <div className="container-row" id="section-footer">
        <div className="container-colum-iframe">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.944300326899!2d-58.58154529999999!3d-34.5802759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb9b9342f8a33%3A0xe567fa70befab086!2sMart%C3%ADn%20Miguens%206864%2C%20B1682AOX%20Villa%20Bosch%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1678129408663!5m2!1ses-419!2sar"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
        <div className="container-colum">
          <div className="row">
            <div className="col s12 boxInfo">
              <div>
                <i className="material-icons">email</i>
              </div>
              <div>
                <p>
                  <b>Mail:</b>
                </p>
                <p>Tensoresfosters@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12 boxInfo">
              <div>
                <i className="material-icons">call</i>
              </div>
              <div>
                <p>
                  <b>Teléfono:</b>
                </p>
                <p>+54 11-6410-1889</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12 boxInfo">
              <div>
                <i className="material-icons">location_on</i>
              </div>
              <div>
                <p>
                  <b>Dirección de Comercial:</b>
                </p>
                <p className="direccion">
                  Martín Miguens 6864, Villa Bosch, Tres de Febrero, Bs. As.
                  Argentina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
