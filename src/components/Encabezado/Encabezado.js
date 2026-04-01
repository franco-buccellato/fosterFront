import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import CartWidget from '../CartWidget/CartWidget';
import UserLogin from '../User/User';
import '../Encabezado/Encabezado.css';
import { useContext, useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Form, Modal } from 'react-bootstrap';
import UsuarioContext from '../Context/UsuarioContext';
import logoFosters from '../../imagenes/LOGO-FOSTERS.png';
import logoSKF from '../../imagenes/SKF-LOGO.png';
import ExportExcel from 'react-export-excel';
import marcasModelos from "../ItemListContainer/marcasmodelos.json";

function Encabezado({ cantidadCarrito }) {
    const ExcelFile = ExportExcel.ExcelFile;
    const ExcelSheet = ExportExcel.ExcelSheet;
    const ExcelColumn = ExportExcel.ExcelColumn;

    const { usuario, estaLogueado, esAdministrador, esClienteDirecto, desloguearUsuario } = useContext(UsuarioContext);
    const [listaDeProductos, setListaDeProducto] = useState([]);
    const [show, setShow] = useState(false);
    const [showListaDePrecios, setShowListaDePrecios] = useState(false);
    const [showFallida, setShowFallida] = useState(false);
    const [utilidadUsuario, setUtilidadUsuario] = useState();
    const [selectedMarca, setSelectedMarca] = useState("");

    useEffect(() => {
        fetch('https://back-fosters.azurewebsites.net/api/productos2/')
            .then(res => res.json())
            .then(data => setListaDeProducto(data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (usuario) setUtilidadUsuario(usuario.utilidad);
    }, [usuario]);

    const configurarNuevaGanancia = () => {
        const nuevaGanancia = document.getElementById("nuevaGanancia").value;
        const usuarioActualizado = {
            utilidad: nuevaGanancia || usuario.utilidad,
            idUsuario: usuario.idUsuario
        };

        fetch('https://back-fosters.azurewebsites.net/api/usuario/actualizar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuarioActualizado),
        })
            .then(res => res.ok ? res.text() : Promise.reject())
            .then(() => {
                setUtilidadUsuario(usuarioActualizado.utilidad);
                setShow(false);
            })
            .catch(() => setShowFallida(true));
    };

    const marcas = Object.keys(marcasModelos).sort();
    const dataFiltrada = selectedMarca
        ? listaDeProductos.filter(p => (p.marca || "").toUpperCase().split(/[-\/|,;]+/).map(m => m.trim()).includes(selectedMarca))
        : listaDeProductos;

    return (
        <>
            <Navbar expand="xl" variant="dark" className='fixed-top navbar-fosters-compact'>
                <Container fluid="lg">
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img src={logoFosters} alt="Foster" className="logo-compact" />
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="main-navbar" />

                    <Navbar.Collapse id="main-navbar">
                        {/* Nav alineado verticalmente para centrar el carrito */}
                        <Nav className="me-auto nav-links-container align-items-center">
                            <LinkContainer to='/'><Nav.Link>Inicio</Nav.Link></LinkContainer>
                            
                            <NavDropdown title="Categorías" id="nav-cats">
                                <LinkContainer to='/productos/tensoresFosters'><NavDropdown.Item>Tensores Poly-V Foster's</NavDropdown.Item></LinkContainer>
                                <LinkContainer to='/productos/tensoresDistribucion'><NavDropdown.Item>Tensores Distribución</NavDropdown.Item></LinkContainer>
                                <LinkContainer to='/productos/tensoresImportados'><NavDropdown.Item>Tensores Poly-V Importados</NavDropdown.Item></LinkContainer>
                                <LinkContainer to='/productos/kitDistribucion'><NavDropdown.Item>Kit Distribución SKF</NavDropdown.Item></LinkContainer>
                                <LinkContainer to='/productos/rodamientos'><NavDropdown.Item>Rodamientos Rueda</NavDropdown.Item></LinkContainer>
                                <NavDropdown.Divider />
                                <LinkContainer to='/productos/todascategorias'><NavDropdown.Item>Todas las categorías</NavDropdown.Item></LinkContainer>
                            </NavDropdown>

                            {esAdministrador() && (
                                <NavDropdown title="Gestión" id="nav-gest" className="admin-dropdown">
                                    <LinkContainer to='usuario'><NavDropdown.Item>Alta Usuario</NavDropdown.Item></LinkContainer>
                                    <LinkContainer to='usuarios'><NavDropdown.Item>Modificar Usuarios</NavDropdown.Item></LinkContainer>
                                    <NavDropdown.Divider />
                                    <LinkContainer to='producto'><NavDropdown.Item>Alta Producto</NavDropdown.Item></LinkContainer>
                                    <LinkContainer to='catalogo'><NavDropdown.Item>Modificar Productos</NavDropdown.Item></LinkContainer>
                                    <NavDropdown.Divider />
                                    <LinkContainer to='aumento'><NavDropdown.Item>Aumentos</NavDropdown.Item></LinkContainer>
                                    <LinkContainer to='recomendaciones'><NavDropdown.Item>Recomendaciones</NavDropdown.Item></LinkContainer>
                                </NavDropdown>
                            )}

                            {/* El carrito ahora tiene una clase específica para control de padding */}
                            {(estaLogueado() && esClienteDirecto() && !esAdministrador()) && (
                                <LinkContainer to='/carrito'>
                                    <Nav.Link className="cart-container-nav">
                                        <CartWidget inicial={cantidadCarrito} />
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>

                        <Nav className="ms-auto align-items-center gap-2">
                            <div className="skf-premium-badge d-none d-lg-flex">
                                <div className="skf-label">PRODUCTO CON</div>
                                <div className="skf-logo-container">
                                    <img src={logoSKF} alt="SKF" />
                                </div>
                            </div>

                            {estaLogueado() ? (
                                <div className="user-action-buttons">
                                    {esClienteDirecto() && (
                                        <>
                                            <Button className="btn-utilidad-pill" onClick={() => setShow(true)}>
                                                Utilidad {utilidadUsuario}%
                                            </Button>
                                            <Button className="btn-catalogo-pill" onClick={() => setShowListaDePrecios(true)}>
                                                Catálogo
                                            </Button>
                                        </>
                                    )}
                                    <div className="separador-v"></div>
                                    <Button variant="danger" className="btn-logout-pill" onClick={desloguearUsuario}>
                                        Cerrar Sesión
                                    </Button>
                                </div>
                            ) : (
                                <div className="login-section-pill">
                                    <LinkContainer to='/login'>
                                        <Button className="btn-login-pill">
                                            Iniciar Sesión
                                        </Button>
                                    </LinkContainer>
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* MODALES SE MANTIENEN IGUAL */}
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton><Modal.Title>Configurar Utilidad</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Porcentaje de utilidad</Form.Label>
                        <Form.Control id='nuevaGanancia' type="number" placeholder="Ej: 10" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Cerrar</Button>
                    <Button variant="primary" onClick={configurarNuevaGanancia}>Guardar</Button>
                </Modal.Footer>
            </Modal>

            <Modal 
                show={showListaDePrecios} 
                onHide={() => setShowListaDePrecios(false)} 
                centered 
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Catálogo de Productos</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Filtrar por marca</Form.Label>
                        <Form.Select 
                            value={selectedMarca} 
                            onChange={(e) => setSelectedMarca(e.target.value)}
                        >
                            <option value="">Todas</option>
                            {marcas.map((marca, i) => (
                                <option key={i} value={marca}>{marca}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {dataFiltrada.map((prod, i) => (
                            <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}>
                                <strong>{prod.codigoFabrica || prod.id}</strong> - {prod.descripcion}
                            </div>
                        ))}
                    </div>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-between">
                    
                    {/* Botón descargar */}
                    <ExcelFile 
                        element={<Button variant="success">Descargar Excel</Button>}
                        filename="catalogo_productos"
                    >
                        <ExcelSheet data={dataFiltrada} name="Productos">
                            <ExcelColumn label="Código" value="id"/>
                            <ExcelColumn label="Descripción" value="descripcion"/>
                            <ExcelColumn label="Marca" value="marca"/>
                            <ExcelColumn label="Medida" value="medida"/>
                            <ExcelColumn label="Código Fabrica" value="codigoFabrica"/>
                            <ExcelColumn label="Precio" value="precio"/>
                        </ExcelSheet>
                    </ExcelFile>

                    {/* Botón cerrar */}
                    <Button 
                        variant="secondary" 
                        onClick={() => setShowListaDePrecios(false)}
                    >
                        Cerrar
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Encabezado;