import {createContext, useState} from 'react';
import { useContext } from 'react';
import UsuarioContext from '../Context/UsuarioContext';

import ApiKey from "../../ApiKey";
import emailjs from '@emailjs/browser';


const CartContext = createContext();

export const CartContextProvider = ({children, onAdd}) => {

    const [cart, setCart] = useState([]);
    const {usuario} = useContext(UsuarioContext);
    let descuentoFinal = usuario !== undefined ? ((100 - usuario.descuento)/100) : 1;

    const addItem = (productAdd) => {
        if(isInCart(productAdd.id)) {
            cart.forEach(
                unItem => {
                    if(unItem.id === productAdd.id) {
                        unItem.nuevaCantidad += productAdd.nuevaCantidad;
                    }
                }
            ); 
        }
        else {
            setCart([...cart, productAdd]);
        }
        onAdd(productAdd.nuevaCantidad);
    }

    const getQuantity = () => {
        let cantidad = 0;
        cart.forEach(
            unItem => cantidad += unItem.nuevaCantidad
        )
        return cantidad;
    }

    const isInCart = (itemId) => {
        return cart.filter(unItem => unItem.id === itemId).length !== 0;
    }

    const clear = () => {
        setCart([]);
    }

    const removeItem = (itemId) => {
        setCart(
            cart.filter(
                unItem => unItem.id !== itemId
            )
        )
    }

    const valorTotal = () => {
        let suma = 0;
        cart.forEach(
            unItem => {
                //suma += (unItem.nuevaCantidad * parseInt(unItem.precioDefinitivo.replace('.','')))
                suma += (unItem.nuevaCantidad * (unItem.precioDefinitivo))
            }
        )
        return suma.toFixed(2);
    }

    const enviarPedido = () => {
        console.log("Enviando pedido.....");
        const pedido = {
            usuario : usuario.nombre,
            pedido : armarPedidoEnHTML(cart, valorTotal()),
            fechaPedido : new Date(),
            total : valorTotal(),
            mailUsuario : usuario.mail
        };
    
        emailjs.send(
            ApiKey.SERVICE_ID,
            ApiKey.TEMPLATE_ID,
            pedido,
            ApiKey.USER_ID
        ).then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            //Modal con Envío exitoso
            window.alert('Pedido enviado con Éxito!');
        }, function(error) {
            console.log('FAILED...', error);
            window.alert('Error al enviar el pedido!');
        });
        //Vaciamos el carrito
        clear();
    }

    const armarTablaPedidoEnHTML = (pedido) => {
        let listaPedidos = '';
        pedido.forEach(
            unPedido => listaPedidos = listaPedidos + 
            `    
                <tr>
                    <td style="width: 10%; text-align: center;">${unPedido.id}</td>
                    <td style="width: 20%; text-align: center;">${unPedido.codigoFabrica}</td>
                    <td style="width: 50%; text-align: center;">${unPedido.nombre}</td>
                    <td style="width: 10%; text-align: center;">${unPedido.nuevaCantidad}</td>
                    <td style="width: 10%; text-align: center;">$${unPedido.precioDefinitivo}</td>
                </tr>
            `
        )            
        return(listaPedidos);
    }
    
    const armarPedidoEnHTML = (pedido, total) => {
        return(
            `
                <table id="tabla_pedido" style="width: 100%;  flex-direction: row;">
                    <tr style="width: 100%;">
                        <th>ID</th>
                        <th>Código Fabricante</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                    </tr>
            `
            +
            armarTablaPedidoEnHTML(pedido)
            +
            `
                    <tr>
                        <td style="width: 10%; text-align: center;"></td>
                        <td style="width: 20%; text-align: center;"></td>
                        <td style="width: 50%; text-align: center;"></td>
                        <td style="width: 10%; text-align: center;">Total:</td>
                        <td style="width: 10%; text-align: center;">$${total}</td>
                    </tr>
                </table>
            `
        )
    }

    return(
        <CartContext.Provider value={{cart, addItem, getQuantity, isInCart, clear, removeItem, valorTotal, enviarPedido}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;