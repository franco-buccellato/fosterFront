import './Usuarios.css';
import { useContext, useEffect, useState} from 'react';
/* import { getUsuraioByContrasenia } from '../../listaDeUsuarios'; */
import UsuarioContext from '../Context/UsuarioContext';
/* import { Link, useNavigate } from 'react-router-dom'; */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import uniqid from 'uniqid';
import axios from 'axios';
import UsuarioItem from './UsuarioItem';

const Usuarios = () => {

    const {usuario, esAdministrador, esClienteDirecto} = useContext(UsuarioContext);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [tablaUsuarios, setTablaUsuarios] = useState();

    useEffect( 
        () => {
        axios.get(
            '/api/usuario/', 
            {
                params: {
                    proveedor: usuario.nombre
                }
            }
        )
        .then(
            res => {
                console.log(res.data);
                setListaUsuarios(res.data);
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        )
        }, [tablaUsuarios, usuario.nombre]
    )

    /* MODAL Ok*/
    const [showOk, setShowOk] = useState(false);
    const handleCloseOk = () => setShowOk(false);
    const handleShowOk = () => {
        setShowOk(true)
        setNombre('');
        setContrasenia('');
        setDescuento('');
        setUtilidad('');
    };
    /* MODAL Error*/
    const [showError, setShowError] = useState(false);
    const handleCloseError = () => setShowError(false);
    const handleShowError = () => setShowError(true);
/*     const navigate = useNavigate(); */

    const [nombre, setNombre] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [descuento, setDescuento] = useState('');
    const [utilidad, setUtilidad] = useState(0);

    const agregarUsuario = () => {
        let nuevoUsuario = {
            nombre: nombre,
            contrasenia: contrasenia,
            descuento: descuento !== '' ? descuento : usuario.descuento,
            utilidad: utilidad,
            proveedor: usuario.nombre,
            idUsuario: uniqid()
        }
        console.log(nuevoUsuario);
        
        axios.post('/api/usuario/nuevo', nuevoUsuario)
            .then(
                res => {
                    //alert(res.data);
                    handleShowOk();
                    setTablaUsuarios(1);
                }
            )
            .catch(
                err => {
                    console.log('Error:' + err);
                    handleShowError();
                }
            )
    }

    //Armar lista de usuario
    const tablaDeUsuario = listaUsuarios.map(
        unUsuario => {
            return (
                <UsuarioItem usuario={unUsuario} esAdministrador={esAdministrador}/>
            )
        }
    )

    if(esAdministrador()) {
        return (
            <div className='container-users'>
                <div className="container-tabla-usuarios">
                    <h1 className='titulo-tabla'>Listado de Usuarios</h1>
                    <Table striped="columns">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Contraseña</th>
                                <th>Descuento</th>
                                <th>Utilidad</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tablaDeUsuario}
                        </tbody>
                    </Table>
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
    } else if(esClienteDirecto()) {
        return (
            <div>
                <div className="container-usuarios">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nuevo Usuario:</Form.Label>
                            <Form.Control type="email" placeholder="Ingrese nuevo usuario" id="usuario" value={nombre} onChange={(e) => {setNombre(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control type="text" placeholder="Contraseña" id="contrasenia" value={contrasenia} onChange={(e) => {setContrasenia(e.target.value)}}/>
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label for='utilidad'>Utilidad:</Form.Label>
                            <Form.Control type="number" placeholder="%" id="utilidad" value={utilidad} onChange={(e) => {setUtilidad(e.target.value)}}/>
                        </Form.Group>  */}
                        <Button variant="outline-success" onClick={() => agregarUsuario()}>Agregar Usuario</Button>
                    </Form>
                </div>
    
                <div className="container-usuarios">
                <Table striped="columns">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Contraseña</th>
                                    <th>Utilidad</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tablaDeUsuario}
                            </tbody>
                        </Table>
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
export default Usuarios;