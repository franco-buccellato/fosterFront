import React, { useContext } from 'react'; // Importación faltante
import './ItemCart.css';
import CartContext from '../Context/CartContext'; // Importación faltante
import UsuarioContext from '../Context/UsuarioContext'; // Importación faltante

const ItemCart = ({id, descripcion, precioDefinitivo, linkImagen, nuevaCantidad}) => {
    const {removeItem} = useContext(CartContext);
    const {estaLogueado} = useContext(UsuarioContext);

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

    const totalFila = (precioDefinitivo * nuevaCantidad).toFixed(2);

    return (
        <div className="item-cart-row">
            <div className="cart-cell img-cell">
                <img src={imagen} alt={id} />
            </div>
            <div className="cart-cell details-cell">
                <span className="item-id">{id}</span>
                <p>{descripcion}</p>
            </div>
            <div className="cart-cell">${precioDefinitivo}</div>
            <div className="cart-cell">${precioDefinitivo}</div>
            <div className="cart-cell"><strong>{nuevaCantidad}</strong></div>
            <div className="cart-cell total-cell">
                {estaLogueado() ? `$${totalFila}` : '---'}
            </div>
            <div className="cart-cell">
                <button className="btn-delete-item" onClick={() => removeItem(id)}>
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </div>
        </div>
    );
}

export default ItemCart; // Exportación faltante que causaba el ERROR en ItemListCart