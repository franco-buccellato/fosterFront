import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const AvisoModalMensaje = () => {

    /* MODAL */
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>¡Aviso Importante!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Mensaje informativo
                </Modal.Body>
                <Modal.Footer>
                    Gracias
                </Modal.Footer>
            </Modal>
    );
}
export default AvisoModalMensaje;