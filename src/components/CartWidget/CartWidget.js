import '../CartWidget/CartWidget.css';
import { useContext } from 'react';
import CartContext from '../Context/CartContext';

const CartWidget = () => {

    const {getQuantity} = useContext(CartContext);

    return (
        <div className='container-carrito'>
            <span className="icon">
                <ion-icon name="cart-outline" size="large"></ion-icon>
            </span>
            <div className='cantidadCarrito'>{getQuantity() === 0 ? '' : getQuantity()}</div>
        </div>
    );
}

export default CartWidget;