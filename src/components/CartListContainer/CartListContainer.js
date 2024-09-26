import './CartListContainer.css';
import ItemListCart from '../ItemListCart/ItemListCart';
import { useContext } from 'react';
import CartContext from '../Context/CartContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const CartListContainer = () => {

    const {cart} = useContext(CartContext);

    console.log("El cart tiene: " + cart.length);

    return (
        <div className="cart-container">
            {
                cart.length > 0 ? <div></div> : <div className='informacion-carrito'><h3>No posee productos en su carrito de compras.</h3></div>
            }
            {   
                cart.length > 0 ? <ItemListCart/> : <Link to = {'/'}><div className='container-return'><Button variant="danger" size="lg">Volver a Inicio</Button>{' '}</div></Link>
            }
        </div>
    );
}
export default CartListContainer;