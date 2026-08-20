import './ItemNovedad.css';
import { Link } from 'react-router-dom';

const ItemNovedad = ({ id, descripcion, marca, modelos = [], codigoFabrica, imagenUrl, linkImagen }) => {
    const cargarImagen = require.context('../../imagenes/Fotos Foster', true);
    
    // 1. Prioridad a la imagen de Cloudinary
    let imagen = imagenUrl || linkImagen || '';

    // 2. Si no hay URL remota, busca en las carpetas locales
    if (!imagen) {
        try {
            imagen = cargarImagen(`./${id}.jpg`);
        } catch (e) {
            try { 
                imagen = cargarImagen(`./${id}.png`); 
            } catch (e2) { 
                imagen = cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`); 
            }
        }
    }

    return (
        <Link to={`/detail/${id}`} className="novedad-link">
            <div className="novedad-card">
                <div className="novedad-box-up">
                    <div className="novedad-badge">NUEVO</div>
                    <img 
                        className="novedad-img" 
                        src={imagen} 
                        alt={codigoFabrica || id} 
                        onError={(e) => {
                            // Si la URL de Cloudinary/remota falla, carga el fallback local
                            e.target.onerror = null;
                            try {
                                e.target.src = cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`);
                            } catch {
                                e.target.style.display = 'none';
                            }
                        }}
                    />
                    
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
};

export default ItemNovedad;