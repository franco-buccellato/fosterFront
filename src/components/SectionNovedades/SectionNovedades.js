import './SectionNovedades.css';
import ItemNovedad from '../ItemNovedad/ItemNovedad';
import { useEffect, useState } from 'react';
import clienteAxios from '../../api/axios';

function SectionNovedades() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        clienteAxios.get('/productos2/')
            .then(res => {
                // Tomamos los últimos 6 productos y los invertimos
                setProductos(res.data.slice(-6).reverse());
            })
            .catch(err => console.error('Error al obtener los productos:', err));
    }, []);

    return (
        <section className="novedades-section" id='section-novedades'>
            <div className='novedades-header'>
                <h4>Últimos ingresos</h4>
                <div className="header-line"></div>
            </div>
            <div className="novedades-grid">
                {productos.map(producto => (
                    <ItemNovedad key={producto.id} {...producto}/>
                ))}
            </div>
        </section>
    )
}

export default SectionNovedades;