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
    const [orden, setOrden] = useState(''); // Estado para el orden

    const [showOk, setShowOk] = useState(false);
    const [showError, setShowError] = useState(false);

    const refrescar = () => setRefresh(prev => prev + 1);

    // GET: Obtenemos las recomendaciones
    useEffect(() => {
        fetch('https://back-fosters.azurewebsites.net/api/recomendaciones')
            .then(res => res.json())
            .then(data => {
                // Ordenamos la lista localmente por el campo 'orden'
                const listaOrdenada = data.sort((a, b) => (a.orden || 0) - (b.orden || 0));
                setLista(listaOrdenada);
            })
            .catch(err => console.log(err));
    }, [refresh]);

    // POST: Agregamos una nueva recomendación con orden
    const agregar = () => {
        if (!idProducto || !descripcion || !orden) {
            setShowError(true);
            return;
        }

        fetch('https://back-fosters.azurewebsites.net/api/recomendaciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: idProducto, 
                descripcion, 
                orden: Number(orden) // Enviamos el orden como número
            })
        })
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(() => {
            setShowOk(true);
            setIdProducto('');
            setDescripcion('');
            setOrden('');
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
                            placeholder="Ej: 97798"
                        />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Ej: AIRE-ALTERNADOR"
                        />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label>Prioridad de Orden (1 es primero)</Form.Label>
                        <Form.Control
                            type="number"
                            value={orden}
                            onChange={(e) => setOrden(e.target.value)}
                            placeholder="Ej: 1"
                        />
                    </Form.Group>

                    <Button className="mt-3" onClick={agregar}>
                        Agregar Recomendación
                    </Button>
                </Form>
            </div>

            <div className="container-tabla-recomendaciones">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Orden</th>
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
                <Modal.Body>Recomendación agregada con éxito.</Modal.Body>
            </Modal>

            <Modal show={showError} onHide={() => setShowError(false)}>
                <Modal.Body>Error al procesar la solicitud. Verificá los campos.</Modal.Body>
            </Modal>
        </div>
    );
};

export default Recomendaciones;