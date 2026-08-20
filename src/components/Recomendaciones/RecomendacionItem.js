import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import clienteAxios from '../../api/axios';

const RecomendacionItem = ({ item, onActualizado }) => {

    // States para modales y edición
    const [showEditar, setShowEditar] = useState(false);
    const [showEliminar, setShowEliminar] = useState(false);
    const [showError, setShowError] = useState(false);

    const [idProducto, setIdProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [orden, setOrden] = useState('');
    const [imagen, setImagen] = useState(null); // Estado para la nueva foto opcional

    // Cargar carpeta de fotos locales como fallback
    const cargarImagen = require.context('../../imagenes/Fotos Foster', true);

    // Obtener imagen (Cloudinary -> Local por ID -> Default)
    // Obtener imagen (Cloudinary -> Local por ID -> Default)
    const getImagen = (itemProducto) => {
        // 1. Prioridad: URL de Cloudinary mandada desde el ABM
        if (itemProducto.imagenUrl) {
            return itemProducto.imagenUrl;
        }
        if (itemProducto.imagen) {
            return itemProducto.imagen;
        }

        // 2. Fallback: Búsqueda local por ID en tu carpeta de proyecto
        try {
            return cargarImagen(`./${itemProducto.id}.jpg`);
        } catch (err) {
            try {
                return cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`);
            } catch {
                return ''; // Si ni siquiera encuentra la imagen por defecto
            }
        }
    };

    // Cargar datos actuales al abrir el modal de edición
    const abrirEditar = () => {
        setIdProducto(item.id || '');
        setDescripcion(item.descripcion || '');
        setOrden(item.orden || ''); 
        setImagen(null); // Limpiamos selección previa de archivo
        setShowEditar(true);
    };

    // PUT: Guardar cambios
    const guardar = () => {
        if (!idProducto.trim() || !String(orden).trim()) {
            setShowError(true);
            return;
        }

        const formData = new FormData();
        formData.append('id', idProducto);
        formData.append('descripcion', descripcion);
        formData.append('orden', Number(orden));

        if (imagen) {
            formData.append('imagen', imagen);
        }

        clienteAxios.put(`/recomendaciones/${item._id}`, formData)
            .then(() => {
                setShowEditar(false);
                onActualizado();
            })
            .catch((err) => {
                console.error('Error al actualizar recomendación:', err);
                setShowError(true);
            });
    };

    // DELETE: Eliminar recomendación
    const eliminar = () => {
        clienteAxios.delete(`/recomendaciones/${item._id}`)
            .then(() => {
                setShowEliminar(false);
                onActualizado();
            })
            .catch((err) => {
                console.error('Error al eliminar recomendación:', err);
                setShowError(true);
            });
    };

    console.log("Datos que recibe la fila:", item);

    return (
        <>
            <tr>
                <td style={{ fontWeight: 'bold' }}>{item.orden}</td>
                <td>{item.id}</td>
                <td>{item.descripcion}</td>
                <td>
                    <img 
                        src={getImagen(item)} 
                        alt={item.descripcion || item.id} 
                        style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} 
                    />
                </td>
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

                        {/* Nueva foto opcional */}
                        <Form.Group className="mt-2">
                            <Form.Label>Cambiar Imagen (Opcional)</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => e.target.files && setImagen(e.target.files[0])}
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