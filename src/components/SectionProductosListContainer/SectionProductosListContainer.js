import {useState, useEffect} from 'react';
import {getFirstProductos} from '../repositorioProductos';
import Loader from '../Loader/Loader';
import ProductoList from '../ProductosList/ProductoList';

function SectionProductosListContainer() {

    const [productos, setProductos] = useState([]);

    useEffect(
        () => {
            getFirstProductos().then(
                listaProductos => {
                    setProductos(listaProductos)
                }
            )
        }, [productos]
    )

    return (
        <div className="section-productos" id='section-productos'>
            {
                productos.length > 0 ? <ProductoList productos = {productos}/> : <Loader/>
            }
            <div id='section-nosotros-id'></div>
        </div>
    );
}

export default SectionProductosListContainer;