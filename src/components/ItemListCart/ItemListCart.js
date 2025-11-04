import './ItemListCart.css';
import ItemCart from '../ItemCart/ItemCart';
import { useContext, useState } from 'react';
import CartContext from '../Context/CartContext';
import UsuarioContext from '../Context/UsuarioContext';

const ItemListCart = () => {
    
    const {cart, valorTotal, clear, enviarPedido} = useContext(CartContext);
    const {estaLogueado} = useContext(UsuarioContext);

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        console.log('intentando cerrar')
        document.getElementById('id-modal-confirmar-pedido').style.visibility = 'hidden';
        document.getElementById('id-modal-confirmar-pedido').style.display = 'none';
        document.getElementById('id-container-itemlist').style.display = 'inline-block';
        document.getElementById('id-container-itemlist').style.visibility = 'visible';
    };
/*     const handleShow = () => {
        setShow(true);
        document.getElementById('id-modal-confirmar-pedido').style.display = 'inline-block';
        document.getElementById('id-modal-confirmar-pedido').style.visibility = 'visible';
        document.getElementById('id-container-itemlist').style.display = 'none';
        document.getElementById('id-container-itemlist').style.visibility = 'hidden';
    }; */

    return (
        <div className="container-itemList-cart" id='id-container-itemlist'>
            <div className="shopping-cart-list">
                <div className="column-labels-cart-list">
                    <label className="product-image-cart-list">Imagen</label>
                    <label className="product-details-cart-list">Código y Descripción del Producto</label>
                    <label className="product-price-cart-list">Precio Lista</label>
                    <label className="product-price-cart-list">Precio Unitario</label>
                    <label className="product-quantity-cart-list">Cantidad</label>
                    <label className="product-removal-cart-list">Eliminar</label>
                    <label className="product-line-price-cart-list">Sub-Total</label>
                </div>
                {cart.map(itemCarrito => <ItemCart key={itemCarrito.id} {...itemCarrito}/>)}
            </div>
            <div className="order-complete">
                <div className="clear-cart">
                    <div className='remove-product-cart-list-total' onClick={() => clear()}>Vaciar Carrito<ion-icon name="trash-outline"></ion-icon></div>
                    {/* <div className='send-product-cart-list-total' onClick={() => handleShow()}>Enviar Pedido<ion-icon name="send-outline"></ion-icon></div> */}
                    <div className='send-product-cart-list-total' onClick={() => enviarPedido()}>Enviar Pedido<ion-icon name="send-outline"></ion-icon></div>
                </div>
                <div className="totals-cart">
                        <div className="totals-value-cart">{estaLogueado() ? '$' + valorTotal() : 'Consultanos!'}</div>
                </div>
            </div>
            <div className='modal-confirmar-pedido' id='id-modal-confirmar-pedido' show={show} onHide={handleClose}>
                <div className="details-modal">
                    <div className="details-modal-title">
                        <h1>Confirmar Pedido:</h1>
                    </div>
                    <div className="details-modal-close" onClick={() => handleClose()}>
                        <ion-icon name="close-outline" size='large'></ion-icon>
                    </div>
                    <div className='container-filtros'>
                        <div className='container-input-mail'>
                            <label>Ingrese su correo electrónico:</label>
                            <input type="email" id="mail-pedido" required></input>
                        </div>
                        <div className='container-filtros-botones'>
                            <div className='container-input-submit'onClick={() => enviarPedido()}>
                                <div id="aplicar_filtro">Confirmar</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ItemListCart;


