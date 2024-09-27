import './Catalogo.css';
import { useContext, useEffect, useState } from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import Table from 'react-bootstrap/Table';
import ProductoItem from './ProductoItem';
import axios from 'axios';

const Catalogo = () => {
    const { esAdministrador } = useContext(UsuarioContext);
    const [listaProductos, setListaProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await axios.get('https://back-fosters.azurewebsites.net/api/productos2/'); // URL completa de Azure
                setListaProductos(res.data);
                console.log(res.data); // Cambié listaProductos a res.data para reflejar la respuesta correcta
            } catch (err) {
                console.error(err);
            }
        };
        fetchProductos();
    }, []);

    if (!esAdministrador()) return null;

    return (
        <div className='container-productos'>
            <div className="container-tabla-productos">
                <h1 className='titulo-tabla-productos'>Listado de Productos</h1>
                <Table striped="columns">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descripción</th>
                            <th>Medida</th>
                            <th>Código Fábrica</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Modelos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaProductos.map(unProducto => (
                                <ProductoItem key={unProducto.id} producto={unProducto} />
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Catalogo;
