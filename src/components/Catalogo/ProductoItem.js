import './ProductoItem.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import clienteAxios from '../../api/axios';

const ProductoItem = ({ producto, onActualizado }) => {
    // Estado del formulario
    const [formData, setFormData] = useState({});
    const [nuevaImagen, setNuevaImagen] = useState(null);

    // Estado de Modales
    const [modalState, setModalState] = useState({
        showEditar: false,
        showOkEditar: false,
        showEliminar: false,
        showOkEliminar: false,
        showFallida: false
    });

    // Cargar fotos locales como fallback
    const cargarImagen = require.context('../../imagenes/Fotos Foster', true);

    const getImagen = (prod) => {
        if (prod.imagenUrl) return prod.imagenUrl;
        if (prod.linkImagen) return prod.linkImagen;

        try {
            return cargarImagen(`./${prod.id}.jpg`);
        } catch {
            try {
                return cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`);
            } catch {
                return '';
            }
        }
    };

    const handleModalToggle = (modalName, value) => {
        setModalState(prevState => ({ ...prevState, [modalName]: value }));
    };

    // 🟢 Abre el modal asegurando formatear el estado actual del producto
    const abrirModalEditar = () => {
        const modelosTexto = Array.isArray(producto.modelos)
            ? producto.modelos.join(', ')
            : (producto.modelos || '');

        setFormData({
            id: producto.id || '',
            descripcion: producto.descripcion || '',
            medida: producto.medida || '',
            codigoFabrica: producto.codigoFabrica || '',
            marca: producto.marca || '',
            precio: producto.precio || '',
            modelos: modelosTexto,
            categoria: producto.categoria || '',
            imagenUrl: producto.imagenUrl || producto.linkImagen || ''
        });
        setNuevaImagen(null);
        handleModalToggle('showEditar', true);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };

    const guardarNuevoProducto = async () => {
        const CLOUD_NAME = "gcmfztce"; 
        const UPLOAD_PRESET = "ml_default";

        try {
            let urlCloudinary = formData.imagenUrl;

            if (nuevaImagen) {
                const dataCloudinary = new FormData();
                dataCloudinary.append('file', nuevaImagen);
                dataCloudinary.append('upload_preset', UPLOAD_PRESET);

                const resCloudinary = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                    { method: 'POST', body: dataCloudinary }
                ).then(res => res.json());

                if (resCloudinary.secure_url) {
                    urlCloudinary = resCloudinary.secure_url;
                }
            }

            const listaModelos = typeof formData.modelos === 'string'
                ? formData.modelos.split(',').map(m => m.trim()).filter(Boolean)
                : formData.modelos;

            const payload = {
                _id: producto._id, 
                ...formData,
                precio: Number(formData.precio),
                modelos: listaModelos,
                imagenUrl: urlCloudinary,
                linkImagen: urlCloudinary
            };

            await clienteAxios.post('/productos2/actualizar', payload);
            
            handleModalToggle('showOkEditar', true);
            if (onActualizado) onActualizado();

        } catch (err) {
            console.error('Error al actualizar producto:', err.response?.data || err.message);
            handleModalToggle('showFallida', true);
        } finally {
            handleModalToggle('showEditar', false);
        }
    };

    const eliminarProductoDefinitivo = async () => {
        try {
            await clienteAxios.post('/productos2/eliminar', producto);
            handleModalToggle('showOkEliminar', true);
            if (onActualizado) onActualizado();
        } catch (err) {
            console.error('Error al eliminar producto:', err);
            handleModalToggle('showFallida', true);
        } finally {
            handleModalToggle('showEliminar', false);
        }
    };

    return (
        <tr>
            <td className="fw-bold">{producto.id}</td>
            <td>
                <img 
                    src={getImagen(producto)} 
                    alt={producto.descripcion || producto.id} 
                    style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} 
                />
            </td>
            <td title={producto.descripcion}>
                <div className="texto-truncado">{producto.descripcion}</div>
            </td>
            <td>{producto.medida || '-'}</td>
            <td>{producto.codigoFabrica || '-'}</td>
            <td>{producto.marca || '-'}</td>
            <td className="fw-semibold text-success">
                ${Number(producto.precio || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
            </td>
            <td style={{ maxWidth: '200px' }}>
                {Array.isArray(producto.modelos) && producto.modelos.length > 0 ? (
                    producto.modelos.slice(0, 3).map((mod, i) => (
                        <span key={i} className="badge-modelo">{mod}</span>
                    )).concat(producto.modelos.length > 3 ? [`+${producto.modelos.length - 3}`] : [])
                ) : (
                    <span className="text-muted small">-</span>
                )}
            </td>
            <td><span className="badge bg-light text-dark">{producto.categoria}</span></td>
            
            {/* Columna Sticky Única de Acciones */}
            <td className="col-acciones">
                <div className="d-flex justify-content-center gap-1">
                    <button 
                        type="button"
                        className="btn-accion edit" 
                        title="Editar"
                        onClick={abrirModalEditar}
                    >
                        <ion-icon name="create-outline" style={{ pointerEvents: 'none' }}></ion-icon>
                    </button>
                    <button 
                        type="button"
                        className="btn-accion delete" 
                        title="Eliminar"
                        onClick={() => handleModalToggle('showEliminar', true)}
                    >
                        <ion-icon name="trash-outline" style={{ pointerEvents: 'none' }}></ion-icon>
                    </button>
                </div>
            </td>

            {/* Modal Editar */}
            <Modal show={modalState.showEditar} onHide={() => handleModalToggle('showEditar', false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="id">ID:</Form.Label>
                            <Form.Control id="id" value={formData.id || ''} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="descripcion">Descripción:</Form.Label>
                            <Form.Control id="descripcion" value={formData.descripcion || ''} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="medida">Medida:</Form.Label>
                            <Form.Control id="medida" value={formData.medida || ''} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="codigoFabrica">Código Fábrica:</Form.Label>
                            <Form.Control id="codigoFabrica" value={formData.codigoFabrica || ''} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="marca">Marca:</Form.Label>
                            <Form.Control id="marca" value={formData.marca || ''} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="precio">Precio:</Form.Label>
                            <Form.Control type="number" id="precio" value={formData.precio || ''} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="modelos">Modelos (separados por comas):</Form.Label>
                            <Form.Control id="modelos" value={formData.modelos || ''} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="categoria">Categoría:</Form.Label>
                            <Form.Control id="categoria" value={formData.categoria || ''} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cambiar Foto del Producto (Opcional)</Form.Label>
                            <Form.Control 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => e.target.files && setNuevaImagen(e.target.files[0])}
                            />
                        </Form.Group>

                        <Button variant="outline-success" onClick={guardarNuevoProducto}>Guardar Cambios</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleModalToggle('showEditar', false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Modales de Confirmación y Notificación */}
            <Modal show={modalState.showOkEditar} onHide={() => handleModalToggle('showOkEditar', false)}>
                <Modal.Header closeButton><Modal.Title>Operación exitosa!</Modal.Title></Modal.Header>
                <Modal.Body>El producto fue modificado correctamente.</Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={() => handleModalToggle('showOkEditar', false)}>Close</Button></Modal.Footer>
            </Modal>

            <Modal show={modalState.showEliminar} onHide={() => handleModalToggle('showEliminar', false)}>
                <Modal.Header closeButton><Modal.Title>Eliminar Producto</Modal.Title></Modal.Header>
                <Modal.Body>¿Está seguro que desea eliminar el producto {producto.descripcion}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={eliminarProductoDefinitivo}>Eliminar Producto</Button>
                    <Button variant="secondary" onClick={() => handleModalToggle('showEliminar', false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modalState.showOkEliminar} onHide={() => handleModalToggle('showOkEliminar', false)}>
                <Modal.Header closeButton><Modal.Title>Operación exitosa!</Modal.Title></Modal.Header>
                <Modal.Body>El producto fue eliminado correctamente.</Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={() => handleModalToggle('showOkEliminar', false)}>Close</Button></Modal.Footer>
            </Modal>

            <Modal show={modalState.showFallida} onHide={() => handleModalToggle('showFallida', false)}>
                <Modal.Header closeButton><Modal.Title>Operación fallida!</Modal.Title></Modal.Header>
                <Modal.Body>La operación falló, vuelva a intentarlo.</Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={() => handleModalToggle('showFallida', false)}>Close</Button></Modal.Footer>
            </Modal>
        </tr>
    );
};

export default ProductoItem;