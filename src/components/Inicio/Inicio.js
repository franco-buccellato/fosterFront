import "./Inicio.css";
import Carousel from "react-bootstrap/Carousel";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import imagenCarrousel1 from '../../imagenes/9.png';
import imagenCarrousel3 from '../../imagenes/10.png';
import imagenCarrousel4 from '../../imagenes/8.png';
import imagenCarrousel5 from '../../imagenes/7.png';

function Inicio() {
    return (
        <Carousel fade interval={5000} className="custom-carousel">
            <Carousel.Item>
                <div className="carousel-overlay-container">
                    <img className="d-block w-100" src={imagenCarrousel1} alt="Tensores Fosters" />
                </div>
                <Carousel.Caption className="carousel-caption-hero">
                    <h1>TENSORES FOSTER'S</h1>
                    <p>Calidad original y máxima durabilidad para su motor.</p>
                    <Link to={'/productos'}>
                        <Button variant="danger" className="btn-hero-pill">NUESTROS PRODUCTOS</Button>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <div className="carousel-overlay-container">
                    <img className="d-block w-100" src={imagenCarrousel3} alt="Distribución" />
                </div>
                <Carousel.Caption className="carousel-caption-hero">
                    <h1>SOPORTE PREMIUM</h1>
                    <p>Contamos con la línea completa de rodamientos y tensores.</p>
                    <Link to={'/productos'}>
                        <Button variant="danger" className="btn-hero-pill">VER CATÁLOGO</Button>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <div className="carousel-overlay-container">
                    <img className="d-block w-100" src={imagenCarrousel4} alt="SKF" />
                </div>
                <Carousel.Caption className="carousel-caption-hero">
                    <h1>ALIANZA ESTRATÉGICA</h1>
                    <p>Productos fabricados con la tecnología y rodamientos SKF.</p>
                    <Link to={'/productos'}>
                        <Button variant="danger" className="btn-hero-pill">SABER MÁS</Button>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Inicio;