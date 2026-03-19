import './Login.css';
import { useContext, useState } from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, Form, Card } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { usuario, loguearUsuario, estaLogueado, desloguearUsuario } = useContext(UsuarioContext);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const loguearse = () => {
        setLoading(true);
        let userVal = document.getElementById("usuario").value;
        let passVal = document.getElementById("contrasenia").value;
        
        axios.post('https://back-fosters.azurewebsites.net/api/usuario/', 
            { nombre: userVal, contrasenia: passVal },
            { headers: { 'content-type': 'application/json' } }
        ).then(res => {
            if (res.data) {
                loguearUsuario(res.data);
                navigate("/productos", { state: { showModal: true } });
            } else {
                handleShow();
            }
        }).catch(() => handleShow())
          .finally(() => setLoading(false));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') loguearse();
    };

    return (
        <div className="login-page-wrapper">
            <Card className="login-card">
                <Card.Body>
                    <div className="login-brand">
                        {/* Aquí podrías poner una versión pequeña de tu logo */}
                        <h3>Foster's</h3>
                        <p>Panel de Clientes</p>
                    </div>

                    {estaLogueado() ? (
                        <div className="logged-in-container">
                            <h4 className="welcome-text">¡Bienvenido, <span>{usuario.nombre}</span>!</h4>
                            <div className="d-grid gap-3">
                                <Link to='/productos' className="btn btn-danger btn-lg">
                                    Explorar Catálogo
                                </Link>
                                <Button variant="outline-secondary" onClick={desloguearUsuario}>
                                    Cerrar Sesión
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Form onKeyDown={handleKeyPress}>
                            <Form.Group className="mb-4">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control size="lg" type="text" placeholder="Tu usuario" id="usuario" autoFocus />
                                <Form.Text className="text-muted">Asignado por la administración.</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control size="lg" type="password" placeholder="••••••••" id="contrasenia" />
                            </Form.Group>

                            <div className="d-grid">
                                <Button 
                                    className="btn-login-submit" 
                                    variant="primary" 
                                    onClick={loguearse}
                                    disabled={loading}
                                >
                                    {loading ? 'Verificando...' : 'Iniciar Sesión'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Error de Acceso</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center py-4">
                    <h5>Credenciales Incorrectas</h5>
                    <p>El usuario y/o la contraseña no coinciden con nuestros registros.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>Reintentar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Login;