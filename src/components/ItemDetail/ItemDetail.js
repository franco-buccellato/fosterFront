import './ItemDetail.css';
import Counter from '../Counter/Counter';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react'
import CartContext from '../Context/CartContext';
import ItemPrecioDetail from '../ItemPrecioDetail/ItemPrecioDetail';
import UsuarioContext from '../Context/UsuarioContext';

const ItemDetail = ({id, descripcion, medida, codigoFabrica, marca, precio, linkImagen,modelos, stock}) => {

    const {usuario, esClienteDirecto} = useContext(UsuarioContext);
    let descuentoFinal = usuario !== undefined ? usuario.descuento : 1;

    const {addItem} = useContext(CartContext);

    const [cantidad, setCantidad] = useState(0);

    const handleOnAdd = (nuevaCantidad) => {
        setCantidad(parseInt(nuevaCantidad));
        const precioDefinitivo = (precio * descuentoFinal).toFixed(2);
        const objProd = {
            id,
            descripcion,
            codigoFabrica,
            precioDefinitivo,
            nuevaCantidad,
            linkImagen
        }
        addItem(objProd);
    }

    const cargarImagen = require.context('../../imagenes/Fotos Foster', true);
    let imagen = '';
    
    try {
        imagen = cargarImagen(`./${id}.jpg`);
    } catch (errorJpg) {
        try {
            imagen = cargarImagen(`./${id}.png`);
        } catch (errorPng) {
            imagen = cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`);
        }
    }

    return (
        <div className="container-item-detail">
            <div className="product">
                <div className="product__photo">
                    <div className="photo-container">
                        <div className="photo-main">
                            <img src={imagen} alt="Imagen principal"></img>
                        </div>
                    </div>
                </div>
                <div className="product__info">
                    <div className="title">
                        <h1>{id}</h1>
                    </div>
                    <div className="title">
                        <span className='span-subtitulo'><u>Descripción:</u></span>
                        <span className='span-contenido'>{descripcion}</span>
                    </div>
                    <div className="title">
                        <span className='span-subtitulo'><u>Medida:</u></span>
                        <span className='span-contenido'>{medida}</span>
                    </div>
                    <div className="title">
                        <span className='span-subtitulo'><u>Marca:</u></span>
                        <span className='span-contenido'>{marca}</span>
                    </div>
                    <div className="price">
                        <u>Precio:</u> <ItemPrecioDetail precioProducto={precio} codigoProducto={id}></ItemPrecioDetail>
                    </div>
                    <div className="title">
                        <span className='span-subtitulo'><u>Modelos:</u></span>
                        <div className="variant">
                            <ul className='variant-list'>
                                {
                                    modelos.map(
                                        (unModelo, index)=> {return <li key={index}>{unModelo}</li>}
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    {
                        codigoFabrica !== '' 
                        && 
                        <div className="title">
                            <span className='span-subtitulo'><u>Código SKF o INA:</u></span>
                            <span className='span-contenido'>{codigoFabrica}</span>
                        </div>
                    }
                    
                    <br></br>
                    {   
                        esClienteDirecto() &&           
                        <Counter inicial={1} maximoStock={stock} onAdd={handleOnAdd}/>
                    }
                    {(cantidad > 0) && <Link className='boton-carrito' to ={`/carrito`}>Ir al Carrito</Link>}
                    {(cantidad > 0) && <Link className='boton-carrito' to ={`/productos`}>Seguir comprando</Link>}
                </div>
            </div>
        </div>
    );
}
export default ItemDetail;