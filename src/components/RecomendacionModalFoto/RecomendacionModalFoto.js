import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './RecomendacionModalFoto.css';
import { useState, useEffect } from 'react';

const RecomendacionModalFoto = ({ productos, show, onClose }) => {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (show) setIndex(0);
    }, [show]);

    const cargarImagen = require.context('../../imagenes/Fotos Foster', true);

    const getImagen = (id) => {
        try {
            return cargarImagen(`./${id}.jpg`);
        } catch {
            return cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`);
        }
    };

    if (!productos || productos.length === 0) return null;

    const productoActual = productos[index];

    return (
        <Modal show={show} onHide={onClose} centered className="modal-interes">
            <Modal.Header closeButton>
                <Modal.Title>¡También podría interesarte!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Carousel   
                    activeIndex={index}
                    onSelect={(selectedIndex) => setIndex(selectedIndex)}
                    interval={null}
                >
                    {productos.map((producto, i) => (
                        <Carousel.Item key={i}>
                            <div className="slide-container">
                                <div className="image-wrapper">
                                    <img
                                        className="carousel-img"
                                        src={getImagen(producto.id)}
                                        alt={producto.descripcion}
                                    />
                                </div>

                                <div className="slide-description">
                                    <h5>{producto.descripcion}</h5>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Modal.Body>

            <Modal.Footer>
                {productoActual && (
                    <Link to={`/detail/${productoActual.id}`}>
                        <Button variant="secondary" onClick={onClose}>
                            Ver producto
                        </Button>
                    </Link>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default RecomendacionModalFoto;