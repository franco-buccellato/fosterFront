import './Usuarios.css';
import { useContext, useEffect, useState} from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import uniqid from 'uniqid';
import clienteAxios from '../../api/axios';

const Usuario = () => {

    const {usuario, esAdministrador, esClienteDirecto} = useContext(UsuarioContext);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [tablaUsuarios, setTablaUsuarios] = useState();

    useEffect(() => {
        clienteAxios.get('/usuario/', {
            params: {
                proveedor: usuario.nombre
            }
        })
        .then(res => {
            console.log(res.data);
            setListaUsuarios(res.data);
        })
        .catch(err => {
            console.error('Error al obtener lista de usuarios:', err);
        });
    }, [tablaUsuarios, usuario.nombre]);

    /* MODAL Ok*/
    const [showOk, setShowOk] = useState(false);
    const handleCloseOk = () => setShowOk(false);
    const handleShowOk = () => {
        setShowOk(true)
        setNombre('');
        setContrasenia('');
        setDescuento('');
        setUtilidad('');
        setDescripcionCliente('');
    };
    /* MODAL Error*/
    const [showError, setShowError] = useState(false);
    const handleCloseError = () => setShowError(false);
    const handleShowError = () => setShowError(true);

    const [nombre, setNombre] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [descuento, setDescuento] = useState('');
    const [utilidad, setUtilidad] = useState(0);
    const [descripcionCliente, setDescripcionCliente] = useState('');


    const agregarUsuario = () => {
        let nuevoUsuario = {
            nombre: nombre,
            contrasenia: contrasenia,
            descripcionCliente: descripcionCliente,
            descuento: descuento !== '' ? descuento : usuario.descuento,
            utilidad: utilidad,
            proveedor: usuario.nombre,
            idUsuario: uniqid()
        };
        
        console.log(nuevoUsuario);
        
        clienteAxios.post('/usuario/nuevo', nuevoUsuario)
        .then(res => {
            //alert(res.data);
            handleShowOk();
            setTablaUsuarios(1);
        })
        .catch(err => {
            console.error('Error al crear usuario:', err);
            handleShowError();
        });
    }

    if(esAdministrador()) {
        return (
            <div>
                <div className="container-usuarios">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label for='usuario'>Nuevo Usuario:</Form.Label>
                            <Form.Control type="email" placeholder="Ingrese nuevo usuario" id="usuario" value={nombre} onChange={(e) => {setNombre(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label for='contrasenia'>Contraseña:</Form.Label>
                            <Form.Control type="text" placeholder="Contraseña" id="contrasenia" value={contrasenia} onChange={(e) => {setContrasenia(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label for='descuento'>Descuento:</Form.Label>
                            <Form.Control type="number" placeholder="%" id="descuento" value={descuento} onChange={(e) => {setDescuento(e.target.value)}}/>
                        </Form.Group> 
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción del cliente:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={descripcionCliente}
                                onChange={(e) => setDescripcionCliente(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="outline-success" onClick={() => agregarUsuario()}>Agregar Usuario</Button>
                    </Form>
                </div>
                <Modal show={showOk} onHide={handleCloseOk}>
                    <Modal.Header closeButton>
                    <Modal.Title>Carga exitosa!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>El usuario fue creado correctamente</Modal.Body>
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
                    <Modal.Body>El usuario no se pudo crear.<br></br>Intentelo nuevamente!</Modal.Body>
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
export default Usuario;
