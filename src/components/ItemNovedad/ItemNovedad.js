import './ItemNovedad.css';
import { Link } from 'react-router-dom';

const ItemNovedad = ({id, descripcion, marca, modelos, codigoFabrica}) => {
    const cargarImagen = require.context('../../imagenes/Fotos Foster', true);
    let imagen = '';
    
    try {
        imagen = cargarImagen(`./${id}.jpg`);
    } catch (e) {
        try { imagen = cargarImagen(`./${id}.png`); } 
        catch (e2) { imagen = cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`); }
    }

    return (
        <Link to={`/detail/${id}`} className="novedad-link">
            <div className="novedad-card">
                <div className="novedad-box-up">
                    <div className="novedad-badge">NUEVO</div>
                    <img className="novedad-img" src={imagen} alt={id} />
                    
                    <div className="novedad-overlay">
                        <p className="novedad-desc">{descripcion}</p>
                    </div>
                </div>

                <div className="novedad-box-down">
                    <span className="novedad-id">{id}</span>
                    <div className="novedad-footer">
                        {codigoFabrica ? (
                            <>
                                <span className="footer-label">EQUIVALENCIA SKF/INA:</span>
                                <span className="footer-value">{codigoFabrica}</span>
                            </>
                        ) : (
                            <span className="footer-value">Sin equivalencia</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
export default ItemNovedad;