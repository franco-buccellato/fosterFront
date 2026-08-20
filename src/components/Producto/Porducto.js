import './Producto.css';
import { useContext, useEffect, useState, useRef } from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import uniqid from 'uniqid';
import clienteAxios from '../../api/axios';

const Producto = () => {
    const { esAdministrador } = useContext(UsuarioContext);
    const [tablaProductos, setTablaProductos] = useState();

    const [id, setId] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [medida, setMedida] = useState('');
    const [codigoFabrica, setCodigoFabrica] = useState('');
    const [marca, setMarca] = useState('');
    const [modelos, setModelos] = useState('');
    const [categoria, setCategoria] = useState('');
    
    // 🆕 Estado y referencia para la imagen
    const [imagen, setImagen] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        clienteAxios.get('/productos2/')
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log('Error al obtener productos:', err);
            });
    }, [tablaProductos]);

    const agregarProducto = async () => {
        const CLOUD_NAME = "gcmfztce"; 
        const UPLOAD_PRESET = "ml_default";

        try {
            let urlImagenCloudinary = '';

            // 1. Subida a Cloudinary
            if (imagen) {
                console.log("Subiendo imagen a Cloudinary...", imagen.name);

                const dataCloudinary = new FormData();
                dataCloudinary.append('file', imagen);
                dataCloudinary.append('upload_preset', UPLOAD_PRESET);

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                    { method: 'POST', body: dataCloudinary }
                );

                const resCloudinary = await response.json();
                console.log("Respuesta de Cloudinary:", resCloudinary);

                if (resCloudinary.secure_url) {
                    urlImagenCloudinary = resCloudinary.secure_url;
                } else {
                    console.error("Error devuelto por Cloudinary:", resCloudinary);
                }
            }

            // 🟢 Procesamiento de modelos: Convierte el String ingresado en Array
            const listaModelos = typeof modelos === 'string' && modelos.trim() !== ''
                ? modelos.split(',').map(m => m.trim()).filter(Boolean)
                : [];

            // 2. Construcción del objeto para el Backend
            const nuevoProducto = {
                id: id,
                descripcion: descripcion,
                precio: Number(precio),
                medida: medida,
                codigoFabrica: codigoFabrica,
                marca: marca,
                modelos: listaModelos, // 👈 Se envía como Array
                categoria: categoria,
                imagenUrl: urlImagenCloudinary,
                linkImagen: urlImagenCloudinary,
                _id: uniqid()
            };

            console.log("Enviando al Backend:", nuevoProducto);

            await clienteAxios.post('/productos2/nuevo', nuevoProducto);
            
            handleShowOk();
            setTablaProductos(Date.now());

        } catch (err) {
            console.error('Error al guardar el producto:', err.response?.data || err.message);
            handleShowError();
        }
    };

    /* MODAL Ok */
    const [showOk, setShowOk] = useState(false);
    const handleCloseOk = () => setShowOk(false);
    const handleShowOk = () => {
        setShowOk(true);
        setId('');
        setDescripcion('');
        setPrecio('');
        setMedida('');
        setCodigoFabrica('');
        setMarca('');
        setModelos('');
        setCategoria('');
        setImagen(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    /* MODAL Error */
    const [showError, setShowError] = useState(false);
    const handleCloseError = () => setShowError(false);
    const handleShowError = () => setShowError(true);

    if (esAdministrador()) {
   
        return (
            <div className='container-productos'>
                <div className="container-usuarios">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='id'>Nuevo ID:</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese nuevo ID" id="id" value={id} onChange={(e) => { setId(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='descripcion'>Descripción:</Form.Label>
                            <Form.Control type="text" placeholder="Descripción" id="descripcion" value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='precio'>Precio:</Form.Label>
                            <Form.Control type="number" placeholder="Precio" id="precio" value={precio} onChange={(e) => { setPrecio(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='medida'>Medida:</Form.Label>
                            <Form.Control type="text" placeholder="Medida" id="medida" value={medida} onChange={(e) => { setMedida(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='codigoFabrica'>Código Fábrica:</Form.Label>
                            <Form.Control type="text" placeholder="Código Fábrica" id="codigoFabrica" value={codigoFabrica} onChange={(e) => { setCodigoFabrica(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='marca'>Marca:</Form.Label>
                            <Form.Control type="text" placeholder="Marca" id="marca" value={marca} onChange={(e) => { setMarca(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='modelos'>Modelos:</Form.Label>
                            <Form.Control type="text" placeholder="Modelos (ej: DUSTER, OROCH)" id="modelos" value={modelos} onChange={(e) => { setModelos(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="categoria">Categoría:</Form.Label>
                            <Form.Select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                <option value="">Selecciona una categoría</option>
                                <option value="tensoresFosters">Tensores Foster's</option>
                                <option value="tensoresDistribucion">Tensores distribución</option>
                                <option value="tensoresImportados">Tensores poly v importados</option>
                                <option value="kitDistribucion">Kit distribución SKF</option>
                                <option value="rodamientos">Rodamientos rueda importados</option>
                            </Form.Select>
                        </Form.Group>

                        {/* 🆕 Campo para cargar la foto */}
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="imagen">Imagen del Producto (Opcional):</Form.Label>
                            <Form.Control 
                                type="file" 
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => e.target.files && setImagen(e.target.files[0])}
                            />
                        </Form.Group>

                        <Button variant="outline-success" onClick={agregarProducto}>Agregar Producto</Button>
                    </Form>
                </div>

                <Modal show={showOk} onHide={handleCloseOk}>
                    <Modal.Header closeButton>
                        <Modal.Title>Carga exitosa!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>El producto fue creado correctamente.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseOk}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showError} onHide={handleCloseError}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>El producto no se pudo crear.<br />Inténtelo nuevamente!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseError}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Producto;