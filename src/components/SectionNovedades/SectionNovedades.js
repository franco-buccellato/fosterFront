import './SectionNovedades.css';
/* import { getUltimosProductos } from '../../listaDeProductos'; */
import ItemNovedad from '../ItemNovedad/ItemNovedad';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SectionNovedades() {

    const [productos, setProductos] = useState([]);
    const [productos2, setProductos2] = useState([]);

/*     useEffect(
        () => {
            getUltimosProductos().then(
                productos => {
                    setProductos(productos)
                }
            )
        }
    ) */

    useEffect( 
        () => {
        axios.get(
            '/api/productos2/', 
            {
                params: {
                }
            }
        )
        .then(
            res => {
                console.log(res.data);
                setProductos(res.data);
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        )
        }, [productos2]
    )

    return (
        <div className="container-section-novedades" id='section-novedades'>
            <div className='container-novedades-title'>
                <h4>Últimos ingresos:</h4>
            </div>
            <div className="container-itemList">
                {productos.slice(productos.length - 8).map(producto => <ItemNovedad key={producto.id} {...producto}/>)}
            </div>
        </div>
    )
}

export default SectionNovedades;