import './Recomendaciones.css';
import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import RecomendacionItem from './RecomendacionItem';
import clienteAxios from '../../api/axios';

const Recomendaciones = () => {
    const [lista, setLista] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const [idProducto, setIdProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [orden, setOrden] = useState('');
    const [imagen, setImagen] = useState(null);

    const [showOk, setShowOk] = useState(false);
    const [showError, setShowError] = useState(false);

    const fileInputRef = useRef(null);

    const refrescar = () => setRefresh(prev => prev + 1);

    // Configuración de Cloudinary
    const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME; // 👈 Cambia por tu Cloud Name de Cloudinary
    const UPLOAD_PRESET = process.env.TU_UPLOAD_PRESET; // 👈 Cambia por tu Unsigned Upload Preset

    // GET: Obtener recomendaciones
    useEffect(() => {
        clienteAxios.get('/recomendaciones')
            .then(res => {
                const listaOrdenada = res.data.sort((a, b) => (a.orden || 0) - (b.orden || 0));
                setLista(listaOrdenada);
            })
            .catch(err => console.log('Error al obtener recomendaciones:', err));
    }, [refresh]);

    const handleImagenChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImagen(e.target.files[0]);
        }
    };

    // POST: Subir foto a Cloudinary y luego crear en Backend
    // POST: Subir foto a Cloudinary y luego crear en Backend
    const agregar = async () => {
        if (!idProducto || !descripcion || !orden) {
            setShowError(true);
            return;
        }

        // ⚠️ Reemplazá por los strings directos de tu cuenta NUEVA y tu preset
        const CLOUD_NAME = "gcmfztce"; 
        const UPLOAD_PRESET = "ml_default";

        try {
            let urlImagenCloudinary = '';

            if (imagen) {
                const dataCloudinary = new FormData();
                dataCloudinary.append('file', imagen);
                dataCloudinary.append('upload_preset', UPLOAD_PRESET);

                // 🔍 LOG 1: Mirá en consola qué URL exacta se está llamando
                console.log("URL solicitada:", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);

                const resCloudinary = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, 
                    {
                        method: 'POST',
                        body: dataCloudinary
                    }
                ).then(res => res.json());

                // 🔍 LOG 2: Respuesta de Cloudinary
                console.log("Respuesta de Cloudinary:", resCloudinary);

                if (resCloudinary.secure_url) {
                    urlImagenCloudinary = resCloudinary.secure_url;
                } else {
                    console.error("Cloudinary no devolvió secure_url. Error:", resCloudinary.error?.message);
                }
            }

            const payload = {
                id: idProducto,
                descripcion: descripcion,
                orden: Number(orden),
                imagenUrl: urlImagenCloudinary
            };

            console.log("Payload enviado al backend:", payload);

            await clienteAxios.post('/recomendaciones', payload);

            setShowOk(true);
            setIdProducto('');
            setDescripcion('');
            setOrden('');
            setImagen(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            refrescar();

        } catch (err) {
            console.error('Error al agregar recomendación:', err);
            setShowError(true);
        }
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

                    <Form.Group className="mt-2">
                        <Form.Label>Imagen de la Recomendación</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImagenChange}
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
                            <th>Imagen</th>
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