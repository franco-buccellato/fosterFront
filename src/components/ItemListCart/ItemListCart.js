import React, { useContext, useState } from 'react';
import './ItemListCart.css'; // Usaremos solo este CSS ahora
import ItemCart from '../ItemCart/ItemCart';
import CartContext from '../Context/CartContext';
import UsuarioContext from '../Context/UsuarioContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ItemListCart = () => {
    const { cart, valorTotal, clear, enviarPedido } = useContext(CartContext);
    const { estaLogueado } = useContext(UsuarioContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="fosters-main-container">
            <div className="cart-card-view">
                {cart.length === 0 ? (
                    <div className="empty-state-wrapper">
                        <div className="empty-icon">
                            <ion-icon name="cart-outline"></ion-icon>
                        </div>
                        <h2>Tu carrito está vacío</h2>
                        <p>No posees productos en tu pedido actualmente.</p>
                        <Link to="/" className="btn-fosters-red">
                            VOLVER AL INICIO
                        </Link>
                    </div>
                ) : (
                    <>
                        <h2 className="cart-title-fosters">Resumen de Pedido</h2>
                        <div className="cart-table">
                            <div className="cart-table-header">
                                <span>Producto</span>
                                <span>Descripción</span>
                                <span>Precio</span>
                                <span>Cant.</span>
                                <span>Subtotal</span>
                                <span>Acción</span>
                            </div>
                            <div className="cart-items-scroll">
                                {cart.map(itemCarrito => (
                                    <ItemCart key={itemCarrito.id} {...itemCarrito}/>
                                ))}
                            </div>
                        </div>

                        <div className="cart-footer-new">
                            <div className="footer-buttons">
                                <button className='btn-fosters-outline' onClick={() => clear()}>VACIAR</button>
                                <button className='btn-fosters-red' onClick={handleShow}>ENVIAR PEDIDO</button>
                            </div>
                            <div className="footer-total">
                                <span className="total-label">TOTAL</span>
                                <span className="total-price-tag">
                                    {estaLogueado() ? '$' + valorTotal().toLocaleString() : 'Consultar'}
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ItemListCart;