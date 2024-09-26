import './ItemCart.css';
import { useContext } from 'react';
import CartContext from '../Context/CartContext';
import UsuarioContext from '../Context/UsuarioContext';
import { getProductosSeleccionados } from '../repositorioProductosSeleccionados';

const ItemCart = ({id, descripcion, precioDefinitivo, linkImagen, nuevaCantidad}) => {

    const {usuario} = useContext(UsuarioContext);
    let descuentoFinal = usuario !== undefined ? ((100 - usuario.descuento)/100) : 1;
    let total;
    const {removeItem} = useContext(CartContext);
    const {estaLogueado} = useContext(UsuarioContext);

    let productosSeleccionados = getProductosSeleccionados();

    const cargarImagen = require.context('../../imagenes/Fotos Foster', true);
    let imagen = '';
    try {
        imagen = cargarImagen(`./${id}.jpg`);
    } catch (error) {
        imagen = cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`);
    }

    if(productosSeleccionados.includes(id) && estaLogueado()) {
        total = precioDefinitivo.toFixed(2) * nuevaCantidad;
        return (
            <div className="shopping-cart-list-container">
                <div className="product-cart-list">
                    <div className="product-image-cart-list">
                        <img className="img-cart-list" src={imagen} alt={id}></img>
                    </div>
                    <div className="product-details-cart-list">
                        <div className="product-title-cart-list">{id}</div>
                        <p className="product-description-cart-list">{descripcion}</p>
                    </div>
                    <div className="product-price-cart-list">{ '$' + (precioDefinitivo).toFixed(2)}</div>
                    <div className="product-price-cart-list">{ '$' + (precioDefinitivo).toFixed(2)}</div>
                    <div className="product-quantity-cart-list">
                        <span>{nuevaCantidad}</span>
                    </div>
                    <div className="product-removal-cart-list">
                        <div className='remove-product-cart-list' onClick={() => removeItem(id)}>Eliminar</div>
                    </div>
                    <div id='precioParaCalcularGanancia' className="product-line-price-cart-list">{estaLogueado() ? '$' + total.toFixed(2) : 'Consultanos!'}</div>
                </div>
            </div>
        );
    } else {
        total = (precioDefinitivo * descuentoFinal).toFixed(2) * nuevaCantidad;
        return (
            <div className="shopping-cart-list-container">
                <div className="product-cart-list">
                    <div className="product-image-cart-list">
                        <img className="img-cart-list" src={linkImagen} alt={id}></img>
                    </div>
                    <div className="product-details-cart-list">
                        <div className="product-title-cart-list">{id}</div>
                        <p className="product-description-cart-list">{descripcion}</p>
                    </div>
    
                    <div className="product-price-cart-list">{ estaLogueado() ? '$' + (precioDefinitivo).toFixed(2): 'Consultanos!'}</div>
                    <div className="product-price-cart-list">{ estaLogueado() ? '$' + (precioDefinitivo * ((100 - usuario.descuento)/100)).toFixed(2): 'Consultanos!'}</div>
                    <div className="product-quantity-cart-list">
                        <span>{nuevaCantidad}</span>
                    </div>
                    <div className="product-removal-cart-list">
                        <div className='remove-product-cart-list' onClick={() => removeItem(id)}>Eliminar</div>
                    </div>
                    <div id='precioParaCalcularGanancia' className="product-line-price-cart-list">{estaLogueado() ? '$' + total.toFixed(2) : 'Consultanos!'}</div>
                </div>
            </div>
        );
    }
}
export default ItemCart;