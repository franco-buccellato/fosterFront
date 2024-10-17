import './UsuarioItem.css';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const UsuarioItem = ({usuario, esAdministrador}) => {

    /* MODAL Editar*/
    const [showEditar, setShowEditar] = useState(false);
    const handleCloseEditar = () => setShowEditar(false);
    const handleShowEditar = () => setShowEditar(true);
    /* MODAL Ok Editar*/
    const [showOkEditar, setShowOkEditar] = useState(false);
    const handleCloseOkEditar = () => setShowOkEditar(false);
    const handleShowOkEditar = () => setShowOkEditar(true);
    /* MODAL Eiminar*/
    const [showEliminar, setShowEliminar] = useState(false);
    const handleCloseEliminar = () => setShowEliminar(false);
    const handleShowEliminar = () => setShowEliminar(true);
    /* MODAL Ok Eiminar*/
    const [showOkEliminar, setShowOkEliminar] = useState(false);
    const handleCloseOkEliminar = () => setShowOkEliminar(false);
    const handleShowOkEliminar = () => setShowOkEliminar(true);
    /* MODAL Fallida*/
    const [showFallida, setShowFallida] = useState(false);
    const handleCloseFallida = () => setShowFallida(false);
    const handleShowFallida= () => setShowFallida(true);

    const editarUsuario = (usuario) => {
        console.log('Editar usuario: ' + usuario.nombre);
        handleShowEditar();
    }
    const eliminarUsuario = (usuario) => {
        console.log('Eliminar usuario: ' + usuario.nombre);
        handleShowEliminar();
    }

    //Guardar nuevos datos del usuario
    const guardarNuevoUsuario = (usuario) => {
        console.log('Modificar usuario: ' + usuario.nombre);
        handleCloseEditar();
        const usuarioActualizado = {
            nombre: nombre !== '' ? nombre : usuario.nombre,
            contrasenia: contrasenia !== '' ? contrasenia : usuario.contrasenia,
            descuento: descuento !== '' ? descuento : usuario.descuento,
            utilidad: utilidad !== '' ? utilidad : usuario.utilidad,
            idUsuario: usuario.idUsuario
        };
        
        console.log('Datos del usuario actualizados:', usuarioActualizado); // Log para verificar
        fetch('https://back-fosters.azurewebsites.net/api/usuario/actualizar', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuarioActualizado),
})
.then(res => {
    console.log('Código de respuesta:', res.status);
    if (!res.ok) {
        return res.text().then(text => { 
            console.log('Respuesta del servidor (error):', text);
            throw new Error(`Error ${res.status}: ${text || 'desconocido'}`); 
        });
    }
    return res.text(); // Cambia esto a text() para manejar texto simple
})
.then(data => {
    console.log('Datos devueltos por el servidor:', data);
    if (data === "OK") { // Compara con el texto que esperas
        handleShowOkEditar();
    } else {
        console.log('La modificación falló según la respuesta del servidor:', data);
        handleShowFallida();
    }
})
.catch(err => {
    console.log('Error en la modificación:', err.message);
    handleShowFallida(); // Esto se llama solo en caso de un error real
});
        

    }
    

    //Eliminar usuairo definitivamente
    const elimnarUsuarioDefinitivo = (usuario) => {
        console.log('Eliminar usuario: ' + usuario.nombre);
        handleCloseEliminar();
        fetch(
            'https://back-fosters.azurewebsites.net/api/usuario/eliminar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.text(); // Cambia a text() si no siempre regresa JSON
        })
        .then(data => {
            console.log('Eliminado correctamente:', data);
            handleShowOkEliminar();
        })
        .catch(err => {
            console.log('Error:', err);
            handleShowFallida();
        });

        

    }

    const [nombre, setNombre] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [descuento, setDescuento] = useState('');
    const [utilidad, setUtilidad] = useState('');

    return (
        <tr>
            <td>{usuario.nombre}</td>
            <td>{usuario.contrasenia}</td>
            {esAdministrador() && <td>{usuario.descuento}</td>}
            <td>{usuario.utilidad}</td>
            <td><ion-icon name="create-outline" onClick={() => editarUsuario(usuario)}></ion-icon></td>
            <td><ion-icon name="trash-outline" onClick={() => eliminarUsuario(usuario)}></ion-icon></td>
            {/* Modales */}
            <Modal show={showEditar} onHide={handleCloseEditar}>
                <Modal.Header closeButton>
                <Modal.Title>Modificar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Modificar Nombre:</Form.Label>
                            <Form.Control type="email" placeholder={usuario.nombre} id="usuario" value={nombre} onChange={(e) => {setNombre(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Modificar Contraseña:</Form.Label>
                            <Form.Control type="text" placeholder={usuario.contrasenia}  id="contrasenia" value={contrasenia} onChange={(e) => {setContrasenia(e.target.value)}}/>
                        </Form.Group>
                        {
                            esAdministrador() ? 
                            <Form.Group className="mb-3" controlId="formBasicDescuento">
                                <Form.Label>Modificar Descuento:</Form.Label>
                                <Form.Control type="number" placeholder={usuario.descuento} id="descuento" value={descuento} onChange={(e) => {setDescuento(e.target.value)}}/>
                            </Form.Group> :
                            <Form.Group className="mb-3" controlId="formBasicDescuento">
                                <Form.Label>Modificar Utilidad:</Form.Label>
                                <Form.Control type="number" placeholder={usuario.utilidad} id="descuento" value={utilidad} onChange={(e) => {setUtilidad(e.target.value)}}/>
                            </Form.Group>
                        }
                        <Button variant="outline-success" onClick={() => guardarNuevoUsuario(usuario)}>Editar Usuario</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditar}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showOkEditar} onHide={handleCloseOkEditar}>
                <Modal.Header closeButton>
                <Modal.Title>Operación exitosa!</Modal.Title>
                </Modal.Header>
                <Modal.Body>El usuario fue modificado correctamente.</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseOkEditar}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEliminar} onHide={handleCloseEliminar}>
                <Modal.Header closeButton>
                <Modal.Title>Eliminar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Esta seguro que desea elimnar al usuario {usuario.nombre}?</Modal.Body>
                <Modal.Footer>
                <Button variant="outline-danger" onClick={() => elimnarUsuarioDefinitivo(usuario)}>Eliminar Usuario</Button>
                <Button variant="secondary" onClick={handleCloseEliminar}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showOkEliminar} onHide={handleCloseOkEliminar}>
                <Modal.Header closeButton>
                <Modal.Title>Operación exitosa!</Modal.Title>
                </Modal.Header>
                <Modal.Body>El usuario fue eliminado correctamente.</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseOkEliminar}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showFallida} onHide={handleCloseFallida}>
                <Modal.Header closeButton>
                <Modal.Title>Operación fallida!</Modal.Title>
                </Modal.Header>
                <Modal.Body>La operación falló, vuelva a intentarlo.</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseFallida}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </tr>
    );
}
export default UsuarioItem;