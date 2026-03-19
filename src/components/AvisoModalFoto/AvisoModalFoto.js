import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AvisoModalFoto.css'; // Importante crear este archivo

const AvisoModalFoto = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const cargarImagen = require.context('../../imagenes/Fotos Foster', true);
    let imagen = '';
    try {
        imagen = cargarImagen(`./VKMC-03256A.jpg`);
    } catch (error) {
        imagen = cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`);
    }

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered 
            className="custom-promo-modal"
        >
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="modal-promo-title">
                    ¡Novedades en Stock!
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body className="text-center pt-2">
                <div className="promo-image-wrapper">
                    <img src={imagen} alt="Producto Nuevo" className="promo-img" />
                    <span className="promo-badge">NUEVO</span>
                </div>
                <div className="promo-info mt-3">
                    <h3>Kit Distribución SKF</h3>
                    <p>Ya disponible en nuestro catálogo de Tensores Foster's.</p>
                </div>
            </Modal.Body>

            <Modal.Footer className="border-0 justify-content-center pb-4">
                <Link to={'/productos/tensoresFosters'} className="w-75">
                    <Button className="btn-promo-action" onClick={handleClose}>
                        VER PRODUCTO
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
}

export default AvisoModalFoto;