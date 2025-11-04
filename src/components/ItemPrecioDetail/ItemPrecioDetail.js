import './ItemPrecioDetail.css';
import { useContext } from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import { getProductosSeleccionados } from '../repositorioProductosSeleccionados';

const ItemPrecioDetail = ({precioProducto,codigoProducto}) => {
    
    const {usuario, esClienteDirecto} = useContext(UsuarioContext);
    let descuentoFinal = usuario !== undefined ? usuario.descuento : 1;

    let productosSeleccionados = getProductosSeleccionados();

    if(productosSeleccionados.includes(codigoProducto)) {
        return(
            <div className='price-container-detail'>
                <span className="price-span-final-sin-el-descuento">
                    {
                        'Precio Final sin Descuento: $' + (precioProducto).toFixed(2)
                    }
                </span>
            </div>
        )
    } else if(esClienteDirecto() && usuario.descuento === 0) {
        return(
            <div className='price-container-detail'>
                <span className="price-span-descuento">
                    {
                        'Precio Lista: $' + (precioProducto).toFixed(2)
                    }
                </span>
                <div className='container-ganancia'>
                    <span className="price-span-ganancia">
                        {
                            'Precio Final: $' + (((precioProducto * descuentoFinal)*usuario.utilidad/100)).toFixed(2)
                        }
                    </span>
                </div>
            </div>
        )
    } else if(esClienteDirecto()) {
        return(
            <div className='price-container-detail'>
                <span className="price-span-normal">
                    {
                        'Precio Lista: $' + (precioProducto).toFixed(2)
                    }
                </span>
                <span className="price-span-descuento">
                    {
                        'Precio c/Descuento: $' + (precioProducto * descuentoFinal).toFixed(2)
                    }
                </span>
                <div className='container-ganancia'>
                    <span className="price-span-ganancia">
                        {
                            'Precio Final: $' + ((precioProducto * descuentoFinal) + ((precioProducto * descuentoFinal)*usuario.utilidad/100)).toFixed(2)
                        }
                    </span>
                </div>
            </div>
        )
    } else {
        return(
            <div className='price-container-detail'>
                <span className="price">Consultanos!</span>
            </div>
        )
    }
}

export default ItemPrecioDetail;