import './Item.css';
import { Link } from 'react-router-dom';
import ItemPrecio from '../ItemPrecio/ItemPrecio';

const Item = ({ id, descripcion, marca, modelos = [], precio, codigoFabrica, imagenUrl, linkImagen }) => {
    const cargarImagen = require.context('../../imagenes/Fotos Foster', true);
    
    let imagen = imagenUrl || linkImagen || '';

    if (!imagen) {
        try {
            imagen = cargarImagen(`./${id}.jpg`);
        } catch (errorJpg) {
            try {
                imagen = cargarImagen(`./${id}.png`);
            } catch (errorPng) {
                imagen = cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`);
            }
        }
    }

    const listaModelosTexto = Array.isArray(modelos) ? modelos.join(' - ') : (modelos || '');

    return (
        <Link to={`/detail/${id}`} className="item-link">
            <div className="el-wrapper">
                <div className="box-up">
                    <img 
                        className="img" 
                        src={imagen} 
                        alt={codigoFabrica || id} 
                        onError={(e) => {
                            e.target.onerror = null;
                            try {
                                e.target.src = cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`);
                            } catch {
                                e.target.style.display = 'none';
                            }
                        }}
                    />
                    <div className="img-info">
                        {/* 1. Solo el ID (se oculta al hacer hover) */}
                        <div className="info-inner">
                            <span className="p-id">{id}</span>
                        </div>
                        
                        {/* 2. Contenido del HOVER (Descripción + Precio) */}
                        <div className="a-size">
                            <p className="desc-text">{descripcion}</p>
                            <div className="hover-precio-box">
                                <ItemPrecio precioProducto={precio} codigoProducto={id} mode="hover" />
                            </div>
                        </div>

                        {/* 3. Marca y Modelos (SIEMPRE VISIBLES) */}
                        <div className="info-bottom">
                            <span className="p-brand">
                                MARCA: <strong>{marca}</strong>
                            </span>
                            <span className="p-models">
                                <strong>MODELOS:</strong> {listaModelosTexto}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="box-down">
                    <div className="h-bg">
                        <div className="h-bg-inner"></div>
                    </div>
                    <div className="cart-content">
                        <div className="price-wrapper-down">
                            <ItemPrecio precioProducto={precio} codigoProducto={id} />
                        </div>
                        <div className="add-to-cart">
                            {codigoFabrica ? (
                                <>
                                    <span className="txt-label">CÓDIGO EQUIVALENTE:</span>
                                    <span className="txt-code">{codigoFabrica}</span>
                                </>
                            ) : (
                                <span className="txt-code">Sin código equivalente</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Item;