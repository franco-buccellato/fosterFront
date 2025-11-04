
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

    const realizarAumento2 = async () => {
        try {
          // 1. Calcular nuevos precios (sin productos EVA y con validaciones)
          const nuevosPrecios = listaProductos
            .filter(unProducto =>
              !(unProducto?.nombre || '').includes('EVA') &&
              unProducto?.precio &&
              aumento
            )
            .map(unProducto => {
              // calcular nuevo precio
              const nuevoPrecio = parseFloat(
                aumento > 100
                  ? unProducto.precio + parseInt(aumento)
                  : (unProducto.precio * ((100 + parseInt(aumento)) / 100))
              ); // -> número, no string
              return {
                id: unProducto.id.toString(),
                nuevoPrecio // así lo espera /aumento2
              };
            });
      
          if (nuevosPrecios.length === 0) {
            console.warn('No hay productos para actualizar.');
            handleShowModal(false);
            return;
          }
      
          // 2. POST al endpoint masivo
          const res = await axios.post(
            'https://back-fosters.azurewebsites.net/api/productos2/aumento2',
            { productos: nuevosPrecios }
          );
      
          console.log('✅ Backend respondió:', res.data);
      
          // 3. Mostrar modal de éxito y actualizar el estado
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
