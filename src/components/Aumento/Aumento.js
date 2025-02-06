// import './Aumento.css';
// import { useContext, useState, useEffect} from 'react';
// import UsuarioContext from '../Context/UsuarioContext';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import axios from 'axios';

// const Aumento = () => {

//     const {esAdministrador} = useContext(UsuarioContext);
//     const [aumento, setAumento] = useState('');
//     const [listaProductos, setListaProductos] = useState([]);
//     const [seActualizo, setSeActualizo] = useState([]);

//     useEffect( 
//         () => {
//         axios.get(
//             '/api/productos2/', 
//             {
//                 params: {
//                 }
//             }
//         )
//         .then(
//             res => {
//                 console.log(res.data);
//                 setListaProductos(res.data);
//             }
//         )
//         .catch(
//             err => {
//                 console.log(err);
//             }
//         )
//         }, [seActualizo]
//     )

//     const realizarAumento = () => {
//         listaProductos.forEach(
//             unProducto => {
//                 if (!unProducto.nombre.toString().includes('EVA') && unProducto.precio !== '' && aumento !== undefined) {
//                     let nuevoAumento;
//                     if(aumento > 100) {
//                         nuevoAumento = {
//                             id: unProducto.id.toString(),
//                             nuevoPrecio: unProducto.precio + parseInt(aumento)
//                             //nuevoPrecio: (unProducto.precio * aumento).toFixed(2)
//                         }
//                     } else {
//                         nuevoAumento = {
//                             id: unProducto.id.toString(),
//                             nuevoPrecio: (unProducto.precio * ((100 + parseInt(aumento))/100)).toFixed(2)
//                             //nuevoPrecio: (unProducto.precio * aumento).toFixed(2)
//                         }
//                     }
//                     console.log(nuevoAumento);

//                     axios
//                     .post('/api/productos2/aumento', nuevoAumento)
//                     .then(
//                         res => {
//                             handleShowOk();
//                             //console.log('Precio actualizado del producto: ' + unProducto.id + ' al precio ' + nuevoAumento.nuevoPrecio)
//                         }
//                     )
//                     .catch(
//                         err => {
//                             console.log('Error:' + err.response.data);
//                             handleShowError();
//                         }
//                     )
//                 }
//             }
//         )
//         setSeActualizo('');
//     }

//         /* MODAL Ok*/
//         const [showOk, setShowOk] = useState(false);
//         const handleCloseOk = () => setShowOk(false);
//         const handleShowOk = () => {
//             setShowOk(true)
//             setAumento('');
//         };
//         /* MODAL Error*/
//         const [showError, setShowError] = useState(false);
//         const handleCloseError = () => setShowError(false);
//         const handleShowError = () => setShowError(true);

//     if(esAdministrador()) {
//         return (
//             <div className='container-productos'>
//                 <div className="container-usuarios">
//                     <Form>
//                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label for='id'>Aumento:</Form.Label>
//                             <Form.Control type="number" placeholder="Ingrese % de aumento o valor a aumentar (mayor a $100)" id="aumento" value={aumento} onChange={(e) => {setAumento(e.target.value)}}/>
//                             <Form.Text className="text-muted">
//                                 IMPORTANTE: Si quiere aumentar un monto fijo ponga el monto (siempre que este sea mayor a $100).
//                                 Si el valor es menor a $100 se toma porcentual.
//                             </Form.Text>
//                         </Form.Group>
//                         <Button variant="outline-success" onClick={() => realizarAumento()}>Aplicar Aumento</Button>
//                     </Form>
//                 </div>
//                 <Modal show={showOk} onHide={handleCloseOk}>
//                     <Modal.Header closeButton>
//                     <Modal.Title>Carga exitosa!</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>El aumento se impacto correctamente!</Modal.Body>
//                     <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseOk}>
//                         Close
//                     </Button>
//                     </Modal.Footer>
//                 </Modal>
//                 <Modal show={showError} onHide={handleCloseError}>
//                     <Modal.Header closeButton>
//                     <Modal.Title>Error</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>El aumento no pudo impactarse.<br></br>Intentelo nuevamente!</Modal.Body>
//                     <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseError}>
//                         Close
//                     </Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         );
//     } 
// }
// export default Aumento;
import './Aumento.css';
import { useContext, useState, useEffect } from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const Aumento = () => {
    const { esAdministrador } = useContext(UsuarioContext);
    const [aumento, setAumento] = useState('');
    const [listaProductos, setListaProductos] = useState([]);
    const [seActualizo, setSeActualizo] = useState(false);
    const [showModal, setShowModal] = useState({ show: false, success: false });

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await axios.get('https://back-fosters.azurewebsites.net/api/productos2/'); // URL completa de Azure
                setListaProductos(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProductos();
    }, [seActualizo]);

    const realizarAumento = async () => {
        try {
            const nuevosPrecios = listaProductos
                .filter(unProducto => !unProducto.nombre.includes('EVA') && unProducto.precio && aumento)
                .map(unProducto => {
                    const nuevoPrecio = aumento > 100
                        ? unProducto.precio + parseInt(aumento)
                        : (unProducto.precio * ((100 + parseInt(aumento)) / 100)).toFixed(2);
                    return { id: unProducto.id.toString(), nuevoPrecio };
                });

            await Promise.all(nuevosPrecios.map(nuevoAumento => 
                axios.post('https://back-fosters.azurewebsites.net/api/productos2/aumento', nuevoAumento) // URL completa de Azure
            ));

            handleShowModal(true);
            setSeActualizo(!seActualizo);
        } catch (err) {
            console.error('Error:', err.response?.data || err.message);
            handleShowModal(false);
        }
    };

    const realizarAumento2 = async () => {
        try {
            // Filtrar y mapear los productos para obtener sus nuevos precios
            const nuevosPrecios = listaProductos
                .filter(unProducto => !unProducto.nombre.includes('EVA') && unProducto.precio && aumento)
                .map(unProducto => {
                    const nuevoPrecio = aumento > 100
                        ? unProducto.precio + parseInt(aumento)
                        : (unProducto.precio * ((100 + parseInt(aumento)) / 100)).toFixed(2);
                    return { id: unProducto.id.toString(), nuevoPrecio };
                });
    
            // Enviar todos los productos con sus nuevos precios en una sola solicitud
            await axios.post('https://back-fosters.azurewebsites.net/api/productos2/aumento2', { productos: nuevosPrecios });
    
            // Mostrar modal de éxito y actualizar el estado
            handleShowModal(true);
            setSeActualizo(!seActualizo);
        } catch (err) {
            console.error('Error:', err.response?.data || err.message);
            handleShowModal(false);
        }
    };
    

    const handleShowModal = (success) => {
        setShowModal({ show: true, success });
        setAumento('');
    };

    const handleCloseModal = () => setShowModal({ ...showModal, show: false });

    if (!esAdministrador()) return null;

    return (
        <div className='container-productos'>
            <div className="container-usuarios">
                <Form>
                    <Form.Group className="mb-3" controlId="aumento">
                        <Form.Label>Aumento:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese % de aumento o valor a aumentar (mayor a $100)"
                            value={aumento}
                            onChange={(e) => setAumento(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            IMPORTANTE: Si quiere aumentar un monto fijo ponga el monto (siempre que este sea mayor a $100).
                            Si el valor es menor a $100 se toma porcentual.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="outline-success" onClick={realizarAumento2}>Aplicar Aumento</Button>
                </Form>
            </div>
            <Modal show={showModal.show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{showModal.success ? 'Carga exitosa!' : 'Error'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showModal.success ? 'El aumento se impactó correctamente!' : 'El aumento no pudo impactarse. Intentelo nuevamente!'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Aumento;
