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

    useEffect(() => {
        fetch('https://back-fosters.azurewebsites.net/api/productos2/')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setProductos(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [productos2]);
    

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