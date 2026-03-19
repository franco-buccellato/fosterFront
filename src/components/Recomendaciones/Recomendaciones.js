import './Recomendaciones.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import RecomendacionItem from './RecomendacionItem';

const Recomendaciones = () => {

    const [lista, setLista] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const [idProducto, setIdProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [showOk, setShowOk] = useState(false);
    const [showError, setShowError] = useState(false);

    const refrescar = () => setRefresh(prev => prev + 1);

    // GET
    useEffect(() => {
        fetch('https://back-fosters.azurewebsites.net/api/recomendaciones')
            .then(res => res.json())
            .then(data => setLista(data))
            .catch(err => console.log(err));
    }, [refresh]);

    // POST
    const agregar = () => {
        if (!idProducto || !descripcion) {
            setShowError(true);
            return;
        }

        fetch('https://back-fosters.azurewebsites.net/api/recomendaciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: idProducto, descripcion })
        })
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(() => {
            setShowOk(true);
            setIdProducto('');
            setDescripcion('');
            refrescar();
        })
        .catch(() => setShowError(true));
    };

    return (



        
        <div className="container-recomendaciones">

            <h1>ABM Recomendaciones</h1>

            <div className="container-form-recomendaciones">
                <Form className="mb-4">
                    <Form.Group>
                        <Form.Label>ID Producto</Form.Label>
                        <Form.Control
                            value={idProducto}
                            onChange={(e) => setIdProducto(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Form.Group>

                    <Button className="mt-3" onClick={agregar}>
                        Agregar
                    </Button>
                </Form>
            </div>
            <div className="container-tabla-recomendaciones">
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descripción</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {lista.map(item => (
                            <RecomendacionItem
                                key={item._id}
                                item={item}
                                onActualizado={refrescar}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
            <Modal show={showOk} onHide={() => setShowOk(false)}>
                <Modal.Body>Recomendación agregada</Modal.Body>
            </Modal>

            <Modal show={showError} onHide={() => setShowError(false)}>
                <Modal.Body>Error al agregar</Modal.Body>
            </Modal>
        </div>
    );
};

export default Recomendaciones;