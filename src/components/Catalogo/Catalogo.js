import './Catalogo.css';
import { useContext, useEffect, useState } from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import Table from 'react-bootstrap/Table';
import ProductoItem from './ProductoItem';
import clienteAxios from '../../api/axios';

const Catalogo = () => {
    const { esAdministrador } = useContext(UsuarioContext);
    const [listaProductos, setListaProductos] = useState([]);

    const fetchProductos = async () => {
        try {
            const res = await clienteAxios.get('/productos2/');
            setListaProductos(res.data);
        } catch (err) {
            console.error('Error al obtener el catálogo:', err);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    if (!esAdministrador()) return null;

    return (
        <div className='container-productos'>
            <div className="container-tabla-productos">
                <h1 className='titulo-tabla-productos mb-4'>Listado de Productos</h1>
                
                {/* Contenedor responsivo con scroll suave */}
                <div className="table-responsive">
                    <Table striped hover className="tabla-custom align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Foto</th>
                                <th>Descripción</th>
                                <th>Medida</th>
                                <th>Cód. Fábrica</th>
                                <th>Marca</th>
                                <th>Precio</th>
                                <th>Modelos</th>
                                <th>Categoría</th>
                                <th className="col-acciones">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaProductos.map((unProducto, index) => (
                                <ProductoItem 
                                    key={unProducto._id || `${unProducto.id}-${index}`}
                                    producto={unProducto} 
                                    onActualizado={fetchProductos} 
                                />
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Catalogo;