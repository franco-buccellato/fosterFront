import "./Inicio.css";
import Carousel from "react-bootstrap/Carousel";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import imagenCarrousel1 from '../../imagenes/9.png';
import imagenCarrousel3 from '../../imagenes/10.png';
import imagenCarrousel4 from '../../imagenes/8.png';
import imagenCarrousel5 from '../../imagenes/7.png';

const cargarImagen = require.context('../../imagenes/Fotos Foster', true);
let imagen = '';
try {
    imagen = cargarImagen(`./VKMC-03256A.jpg`);
} catch (error) {
    imagen = cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`);
}

function Inicio() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={imagenCarrousel1}
                    alt="First slide"
                />
                <Carousel.Caption className="carousel-caption-1">
                    <div className="card-superior-carousel-caption">
                        <Link to = {'/productos'}>
                            <Button variant="danger" size="lg" className="boton-nuestros-productos">Nuestros Productos</Button>{' '}
                        </Link>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={imagenCarrousel3}
                    alt="Third slide"
                />
                <Carousel.Caption className="carousel-caption-1">
                    <div className="card-superior-carousel-caption">
                        <Link to = {'/productos'}>
                            <Button variant="danger" size="lg" className="boton-nuestros-productos">Nuestros Productos</Button>{' '}
                        </Link>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={imagenCarrousel4}
                    alt="Third slide"
                />
                <Carousel.Caption className="carousel-caption-1">
                    <div className="card-superior-carousel-caption">
                        <Link to = {'/productos'}>
                            <Button variant="danger" size="lg" className="boton-nuestros-productos">Nuestros Productos</Button>{' '}
                        </Link>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={imagenCarrousel5}
                    alt="Third slide"
                />
                <Carousel.Caption className="carousel-caption-1">
                    <div className="card-superior-carousel-caption">
                        <Link to = {'/productos'}>
                            <Button variant="danger" size="lg" className="boton-nuestros-productos">Nuestros Productos</Button>{' '}
                        </Link>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Inicio;
