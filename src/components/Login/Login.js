import './Login.css';
import { useContext, useState } from 'react';
//import { getUsuraioByContrasenia } from '../../listaDeUsuarios';
import UsuarioContext from '../Context/UsuarioContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import axios from 'axios';

const Login = () => {

    /* MODAL */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {usuario, loguearUsuario, estaLogueado, desloguearUsuario} = useContext(UsuarioContext);
    const navigate = useNavigate();
    const loguearse = () => {
        let usuario = document.getElementById("usuario").value;
        let contrasenia = document.getElementById("contrasenia").value;
        axios.post(
            '/api/usuario/',
            {nombre: usuario, contrasenia: contrasenia},
            {headers: {'content-type': 'application/json'}}
        ).then(
            res => {
                if(res.data) {
                    console.log(res.data);
                    loguearUsuario(res.data);
                    navigate("/productos");
                } else {
                    handleShow();
                }
            }
        )
        .catch(
            err => {
                handleShow();
            }
        )

    }

    const handleKeyPress = (evento) => {
        let e = evento || window.event;
        if(e.keyCode === 13){
            loguearse();
        }
    }

    return (
        <div>
            {
                estaLogueado() ?
                <div className="container-login">
                    <div className='container-titulo'>
                        <h4>¡Bienvenido {usuario.nombre}!</h4>
                    </div>
                    <div className='container-filtros-botones-login'>
                            <Link to = {'/productos'}>
                                <Button variant="danger" size="lg">Nuestros Productos</Button>{' '}
                            </Link>
                    </div>
                    <div className='container-filtros-botones'>
                        <Button variant="outline-danger" onClick={() => desloguearUsuario()}>Cerrar Sesión</Button>
                    </div>
                </div> 
                :
                <div className="container-login" onKeyDown={() => handleKeyPress()}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Usuario:</Form.Label>
                            <Form.Control type="email" placeholder="Ingrese su usuario" id="usuario"/>
                            <Form.Text className="text-muted">
                            Usuario asignado por Foster's.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" id="contrasenia"/>
                            <Form.Text className="text-muted">
                                Contraseña asignada por Foster's.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="outline-success" onClick={() => loguearse()}>Iniciar Sesión</Button>
                    </Form>
                </div>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>El usuario y/o la contraseña son incorrectas.<br></br>Intentelo nuevamente!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default Login;