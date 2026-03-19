import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const RecomendacionItem = ({ item, onActualizado }) => {

    // 🔹 STATES
    const [showEditar, setShowEditar] = useState(false);
    const [showEliminar, setShowEliminar] = useState(false);
    const [showError, setShowError] = useState(false);

    const [idProducto, setIdProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // 🔹 ABRIR EDITAR (IMPORTANTE: setear valores actuales)
    const abrirEditar = () => {
        setIdProducto(item.id || '');
        setDescripcion(item.descripcion || '');
        setShowEditar(true);
    };

    // 🔹 EDITAR
    const guardar = () => {

        if (!idProducto.trim()) {
            setShowError(true);
            return;
        }

        fetch(`https://back-fosters.azurewebsites.net/api/recomendaciones/${item._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: idProducto,
                descripcion: descripcion
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

    // 🔹 ELIMINAR
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
                <td>{item.id}</td>
                <td>{item.descripcion}</td>

                <td>
                    <ion-icon
                        name="create-outline"
                        style={{ cursor: 'pointer' }}
                        onClick={abrirEditar}
                    />
                </td>

                <td>
                    <ion-icon
                        name="trash-outline"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowEliminar(true)}
                    />
                </td>
            </tr>

            {/* 📝 EDITAR */}
            <Modal show={showEditar} onHide={() => setShowEditar(false)}>
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
                                placeholder="Ej: 84690"
                            />
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </Form.Group>

                        <Button className="mt-3" variant="success" onClick={guardar}>
                            Guardar cambios
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* 🗑 ELIMINAR */}
            <Modal show={showEliminar} onHide={() => setShowEliminar(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    ¿Eliminar recomendación <b>{item.id}</b>?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={eliminar}>
                        Eliminar
                    </Button>
                    <Button variant="secondary" onClick={() => setShowEliminar(false)}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ❌ ERROR */}
            <Modal show={showError} onHide={() => setShowError(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Verificá los datos (ID vacío o duplicado).
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RecomendacionItem;