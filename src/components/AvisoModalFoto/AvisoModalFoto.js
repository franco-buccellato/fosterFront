import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import {Link} from 'react-router-dom';

const AvisoModalFoto = () => {

    /* MODAL */
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const cargarImagen = require.context('../../imagenes/Fotos Foster', true);
    let imagen = '';
    try {
        //imagen = cargarImagen(`./${id}.jpg`);
        imagen = cargarImagen(`./VKMC-03256A.jpg`);
    } catch (error) {
        imagen = cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`);
    }


    return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>¡Nuevos Productos!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card style={{ width: '100%' }}>
                        <Card.Img variant="top" src={imagen} />
                        <Card.Body>
                            <Card.Title>Kit distribucion SKF</Card.Title>
                            <Card.Text>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                <Link to = {'/productos/tensoresFosters'}>
                    <Button variant="secondary" onClick={handleClose}>
                        Ver
                    </Button>
                </Link>
                </Modal.Footer>
            </Modal>
    );
}
export default AvisoModalFoto;