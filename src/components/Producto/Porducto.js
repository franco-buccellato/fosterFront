import './Producto.css';
import { useContext, useEffect, useState} from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import uniqid from 'uniqid';
import axios from 'axios';

const Producto = () => {

    const {esAdministrador} = useContext(UsuarioContext);
    const [tablaProductos, setTablaProductos] = useState();

    useEffect(() => {
        fetch('https://back-fosters.azurewebsites.net/api/productos2/')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [tablaProductos]);
    

    const [id, setId] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [medida, setMedida] = useState('');
    const [codigoFabrica, setCodigoFabrica] = useState('');
    const [marca, setMarca] = useState('');
    const [modelos, setModelos] = useState('');

    const agregarProducto = () => {
        let nuevoProducto = {
            id: id,
            descripcion: descripcion,
            precio: precio,
            medida: medida,
            codigoFabrica: codigoFabrica,
            marca: marca,
            modelos: modelos,
            _id: uniqid()
        }
        console.log(nuevoProducto);
        
        fetch('https://back-fosters.azurewebsites.net/api/productos2/nuevo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Especifica el tipo de contenido
            },
            body: JSON.stringify(nuevoProducto), // Convierte el objeto nuevoProducto a JSON
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            handleShowOk(); // Muestra el mensaje de éxito
            setTablaProductos(1); // Actualiza la tabla de productos
        })
        .catch(err => {
            console.log('Error: ' + err);
            handleShowError(); // Muestra el mensaje de error
        });
        
    }

        /* MODAL Ok*/
        const [showOk, setShowOk] = useState(false);
        const handleCloseOk = () => setShowOk(false);
        const handleShowOk = () => {
            setShowOk(true)
            setDescripcion('');
            setPrecio('');
            setMedida('');
            setCodigoFabrica('');
            setMarca('');
            setModelos('')
        };
        /* MODAL Error*/
        const [showError, setShowError] = useState(false);
        const handleCloseError = () => setShowError(false);
        const handleShowError = () => setShowError(true);

    if(esAdministrador()) {
        return (
            <div className='container-productos'>
                <div className="container-usuarios">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label for='id'>Nuevo ID:</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese nuevo ID" id="id" value={id} onChange={(e) => {setId(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='descripcion'>Descripcion:</Form.Label>
                            <Form.Control type="text" placeholder="Descripcion" id="descripcion" value={descripcion} onChange={(e) => {setDescripcion(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='precio'>Precio:</Form.Label>
                            <Form.Control type="number" placeholder="Precio" id="precio" value={precio} onChange={(e) => {setPrecio(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='medida'>Medida:</Form.Label>
                            <Form.Control type="text" placeholder="Medida" id="medida" value={medida} onChange={(e) => {setMedida(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='codigoFabrica'>Código Fabrica:</Form.Label>
                            <Form.Control type="text" placeholder="Codigo Fabrica" id="codigoFabrica" value={codigoFabrica} onChange={(e) => {setCodigoFabrica(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='marca'>Marca:</Form.Label>
                            <Form.Control type="text" placeholder="Marca" id="marca" value={marca} onChange={(e) => {setMarca(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='modelos'>Modelos:</Form.Label>
                            <Form.Control type="text" placeholder="Modelos" id="modelos" value={modelos} onChange={(e) => {setModelos(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="outline-success" onClick={() => agregarProducto()}>Agregar Producto</Button>
                    </Form>
                </div>
                <Modal show={showOk} onHide={handleCloseOk}>
                    <Modal.Header closeButton>
                    <Modal.Title>Carga exitosa!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>El producto fue creado correctamente</Modal.Body>
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
                    <Modal.Body>El producto no se pudo crear.<br></br>Intentelo nuevamente!</Modal.Body>
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