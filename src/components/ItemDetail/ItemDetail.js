import './ItemDetail.css';
import Counter from '../Counter/Counter';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react'
import CartContext from '../Context/CartContext';
import ItemPrecioDetail from '../ItemPrecioDetail/ItemPrecioDetail';
import UsuarioContext from '../Context/UsuarioContext';

const ItemDetail = ({id, descripcion, medida, codigoFabrica, marca, precio, linkImagen, modelos, stock}) => {
    const {usuario, esClienteDirecto} = useContext(UsuarioContext);
    let descuentoFinal = usuario?.descuento ?? 1;
    const {addItem} = useContext(CartContext);
    const [cantidad, setCantidad] = useState(0);

    const handleOnAdd = (nuevaCantidad) => {
        setCantidad(parseInt(nuevaCantidad));
        const precioDefinitivo = (precio * descuentoFinal).toFixed(2);
        addItem({ id, descripcion, codigoFabrica, precioDefinitivo, nuevaCantidad, linkImagen });
    }

    // Lógica de carga de imagen optimizada
    const cargarImagen = require.context('../../imagenes/Fotos Foster', true);
    let imagen = '';
    try { 
        imagen = cargarImagen(`./${id}.jpg`); 
    } catch (e) { 
        try { 
            imagen = cargarImagen(`./${id}.png`); 
        } catch (e2) { 
            imagen = cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`); 
        }
    }

    return (
        <div className="product-card">
            <div className="product-visual">
                <img src={imagen} alt={descripcion} className="main-img" />
            </div>

            <div className="product-details">
                <header className="detail-header">
                    <span className="badge-id">{id}</span>
                    <h1 className="product-title">{descripcion}</h1>
                    <p className="brand-text">{marca}</p>
                </header>

                <div className="specs-grid">
                    <div className="spec-item">
                        <label>Medida</label>
                        <span className="spec-value">{medida}</span>
                    </div>
                    {codigoFabrica && (
                        <div className="spec-item">
                            <label>Equivalencia</label>
                            <span className="spec-value">{codigoFabrica}</span>
                        </div>
                    )}
                </div>

                <div className="price-section-box">
                    <label className="section-label">Cotización</label>
                    <ItemPrecioDetail precioProducto={precio} codigoProducto={id} />
                </div>

                <div className="models-section">
                    <label className="section-label">Modelos Compatibles</label>
                    <div className="models-chips">
                        {modelos && modelos.map((m, i) => (
                            <span key={i} className="model-chip">{m}</span>
                        ))}
                    </div>
                </div>

                <div className="detail-actions">
                    {esClienteDirecto() && cantidad === 0 && (
                        <div className="counter-wrapper-clean">
                            <Counter inicial={1} maximoStock={stock} onAdd={handleOnAdd}/>
                        </div>
                    )}
                    
                    {cantidad > 0 && (
                        <div className="post-add-group">
                            <Link className='btn-finish-pill' to="/carrito">Finalizar Compra</Link>
                            <Link className='btn-continue-link' to="/productos">Seguir Comprando</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;