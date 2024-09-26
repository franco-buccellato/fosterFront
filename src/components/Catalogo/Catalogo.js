// import './Catalogo.css';
// import { useContext, useEffect, useState} from 'react';
// import UsuarioContext from '../Context/UsuarioContext';
// import Table from 'react-bootstrap/Table';
// import ProductoItem from './ProductoItem';
// import axios from 'axios';

// const Catalogo = () => {

//     const {esAdministrador} = useContext(UsuarioContext);
//     const [listaProductos, setListaProductos] = useState([]);
//     const [tablaProductos, setTablaProductos] = useState();

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
//         }, [tablaProductos]
//     )

//     //Armar lista de usuario
//     const tablaDeProductos = listaProductos.map(
//         unProducto => {
//             return (
//                 <ProductoItem producto={unProducto}/>
//             )
//         }
//     )

//     if(esAdministrador()) {
//         return (
//             <div className='container-productos'>
//                 <div className="container-tabla-productos">
//                     <h1 className='titulo-tabla-productos'>Listado de Productos</h1>
//                     <Table striped="columns">
//                         <thead>
//                             <tr>
//                                 <th>Id</th>
//                                 <th>Nombre</th>
//                                 <th>Precio</th>
//                                 <th>Rubro</th>
//                                 <th>Código Fábrica</th>
//                                 <th>Tipo Modificación</th>
//                                 <th>Marca</th>
//                                 <th>Modelos</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {tablaDeProductos}
//                         </tbody>
//                     </Table>
//                 </div>
//             </div>
//         );
//     } 
// }
// export default Catalogo;

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
                const res = await axios.get('/api/productos2/');
                setListaProductos(res.data);
                console.log(listaProductos);
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
                            <th>Descripcion</th>
                            <th>Medida</th>
                            <th>Código Fabrica</th>
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
