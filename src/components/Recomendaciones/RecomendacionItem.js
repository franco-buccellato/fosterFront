import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const RecomendacionItem = ({ item, onActualizado }) => {

    // States para modales y edición
    const [showEditar, setShowEditar] = useState(false);
    const [showEliminar, setShowEliminar] = useState(false);
    const [showError, setShowError] = useState(false);

    const [idProducto, setIdProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [orden, setOrden] = useState(''); // Estado para el orden

    // Cargar datos actuales al abrir el modal de edición
    const abrirEditar = () => {
        setIdProducto(item.id || '');
        setDescripcion(item.descripcion || '');
        setOrden(item.orden || ''); 
        setShowEditar(true);
    };

    // PUT: Guardar cambios incluyendo el nuevo orden
    const guardar = () => {
        if (!idProducto.trim() || !String(orden).trim()) {
            setShowError(true);
            return;
        }

        fetch(`https://back-fosters.azurewebsites.net/api/recomendaciones/${item._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: idProducto,
                descripcion: descripcion,
                orden: Number(orden) // Actualizamos el orden
            })
        })
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(() => {
            setShowEditar(false);
            onActualizado();
        })
        .catch(() => setShowError(true));
    };

    // DELETE: Eliminar recomendación
    const eliminar = () => {
        fetch(`https://back-fosters.azurewebsites.net/api/recomendaciones/${item._id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setShowEliminar(false);
            onActualizado();
        })
        .catch(() => setShowError(true));
    };

    return (
        <>
            <tr>
                <td style={{ fontWeight: 'bold' }}>{item.orden}</td>
                <td>{item.id}</td>
                <td>{item.descripcion}</td>
                <td>
                    <ion-icon
                        name="create-outline"
                        style={{ cursor: 'pointer', fontSize: '20px', color: '#003399' }}
                        onClick={abrirEditar}
                    />
                </td>
                <td>
                    <ion-icon
                        name="trash-outline"
                        style={{ cursor: 'pointer', fontSize: '20px', color: '#CD1F26' }}
                        onClick={() => setShowEliminar(true)}
                    />
                </td>
            </tr>

            {/* Modal Editar */}
            <Modal show={showEditar} onHide={() => setShowEditar(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Recomendación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
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
                        <Form.Group className="mt-2">
                            <Form.Label>Orden de Visualización</Form.Label>
                            <Form.Control
                                type="number"
                                value={orden}
                                onChange={(e) => setOrden(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="mt-4 w-100" variant="success" onClick={guardar}>
                            Guardar Cambios
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal Eliminar */}
            <Modal show={showEliminar} onHide={() => setShowEliminar(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que querés eliminar la recomendación del producto <b>{item.id}</b>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={eliminar}>Eliminar</Button>
                    <Button variant="secondary" onClick={() => setShowEliminar(false)}>Cancelar</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Error */}
            <Modal show={showError} onHide={() => setShowError(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ups! Algo salió mal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Hubo un problema al guardar los datos. Verificá que el ID no esté vacío y que el orden sea un número.
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RecomendacionItem;