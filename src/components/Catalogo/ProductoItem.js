import './ProductoItem.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const ProductoItem = ({ producto }) => {
    const [formData, setFormData] = useState({
        id: producto.id,
        descripcion: producto.descripcion,
        medida: producto.medida,
        codigoFabrica: producto.codigoFabrica,
        marca: producto.marca,
        precio: producto.precio,
        modelos: producto.modelos,
        categoria: producto.categoria
    });

    const [modalState, setModalState] = useState({
        showEditar: false,
        showOkEditar: false,
        showEliminar: false,
        showOkEliminar: false,
        showFallida: false
    });

    const handleModalToggle = (modalName, value) => {
        setModalState(prevState => ({ ...prevState, [modalName]: value }));
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };

    const guardarNuevoProducto = async () => {
        try {
            await axios.post('https://back-fosters.azurewebsites.net/api/productos2/actualizar', formData); // URL de Azure
            handleModalToggle('showOkEditar', true);
        } catch (err) {
            console.error(err);
            handleModalToggle('showFallida', true);
        } finally {
            handleModalToggle('showEditar', false);
        }
    };

    const eliminarProductoDefinitivo = async () => {
        try {
            await axios.post('https://back-fosters.azurewebsites.net/api/productos2/eliminar', producto); // URL de Azure
            handleModalToggle('showOkEliminar', true);
        } catch (err) {
            console.error(err);
            handleModalToggle('showFallida', true);
        } finally {
            handleModalToggle('showEliminar', false);
        }
    };

    return (
        <tr>
            <td>{producto.id}</td>
            <td>{producto.descripcion}</td>
            <td>{producto.medida}</td>
            <td>{producto.codigoFabrica}</td>
            <td>{producto.marca}</td>
            <td>{producto.precio}</td>
            <td>{producto.modelos}</td>
            <td>{producto.categoria}</td>
            <td><ion-icon name="create-outline" onClick={() => handleModalToggle('showEditar', true)}></ion-icon></td>
            <td><ion-icon name="trash-outline" onClick={() => handleModalToggle('showEliminar', true)}></ion-icon></td>

            {/* Modales */}
            <Modal show={modalState.showEditar} onHide={() => handleModalToggle('showEditar', false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {Object.keys(formData).map((key) => (
                            key !== 'linkImagen' && (
                                <Form.Group key={key} className="mb-3">
                                    <Form.Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Form.Label>
                                    <Form.Control
                                        type={key === 'precio' ? 'number' : 'text'}
                                        id={key}
                                        placeholder={producto[key]}
                                        value={formData[key]}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            )
                        ))}
                        <Button variant="outline-success" onClick={guardarNuevoProducto}>Editar Producto</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleModalToggle('showEditar', false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modalState.showOkEditar} onHide={() => handleModalToggle('showOkEditar', false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Operación exitosa!</Modal.Title>
                </Modal.Header>
                <Modal.Body>El producto fue modificado correctamente.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleModalToggle('showOkEditar', false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modalState.showEliminar} onHide={() => handleModalToggle('showEliminar', false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Está seguro que desea eliminar el producto {producto.descripcion}? </Modal.Body> {/* Cambié producto.nombre a producto.descripcion */}
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={eliminarProductoDefinitivo}>Eliminar Producto</Button>
                    <Button variant="secondary" onClick={() => handleModalToggle('showEliminar', false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modalState.showOkEliminar} onHide={() => handleModalToggle('showOkEliminar', false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Operación exitosa!</Modal.Title>
                </Modal.Header>
                <Modal.Body>El producto fue eliminado correctamente.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleModalToggle('showOkEliminar', false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modalState.showFallida} onHide={() => handleModalToggle('showFallida', false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Operación fallida!</Modal.Title>
                </Modal.Header>
                <Modal.Body>La operación falló, vuelva a intentarlo.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleModalToggle('showFallida', false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </tr>
    );
};

export default ProductoItem;
