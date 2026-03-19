import './SectionNovedades.css';
import ItemNovedad from '../ItemNovedad/ItemNovedad';
import { useEffect, useState } from 'react';

function SectionNovedades() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('https://back-fosters.azurewebsites.net/api/productos2/')
            .then(res => {
                if (!res.ok) throw new Error('Error en la red');
                return res.json();
            })
            .then(data => {
                // Tomamos los últimos 8 productos
                setProductos(data.slice(-6).reverse());
            })
            .catch(err => console.error(err));
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