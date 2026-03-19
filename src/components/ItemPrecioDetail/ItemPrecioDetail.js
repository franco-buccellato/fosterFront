import './ItemPrecioDetail.css';
import { useContext } from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import { getProductosSeleccionados } from '../repositorioProductosSeleccionados';

const ItemPrecioDetail = ({precioProducto, codigoProducto}) => {
    const {usuario, esClienteDirecto} = useContext(UsuarioContext);
    const descuentoFinal = usuario?.descuento ?? 1;
    const utilidad = usuario?.utilidad ?? 0;
    const productosSeleccionados = getProductosSeleccionados();
    const esSeleccionado = productosSeleccionados.includes(codigoProducto);

    if (esSeleccionado) {
        return (
            <div className='price-container-detail'>
                <span className="price-label">Precio Final sin Descuento</span>
                <span className="price-value-red">${precioProducto.toFixed(2)}</span>
            </div>
        );
    }

    if (esClienteDirecto()) {
        const pLista = precioProducto.toFixed(2);
        const pConDesc = (precioProducto * descuentoFinal).toFixed(2);
        const pFinal = ((precioProducto * descuentoFinal) * (1 + utilidad / 100)).toFixed(2);

        return (
            <div className='price-container-detail'>
                <div className="price-row">
                    <span className="price-old">Lista: ${pLista}</span>
                    {descuentoFinal < 1 && <span className="price-promo">c/Desc: ${pConDesc}</span>}
                </div>
                <div className='price-final-box'>
                    <span className="final-label">Precio Final</span>
                    <span className="final-value">${pFinal}</span>
                </div>
            </div>
        );
    }

    return (
        <div className='price-container-detail'>
            <span className="price-consult">Consultar Precio</span>
        </div>
    );
}

export default ItemPrecioDetail;