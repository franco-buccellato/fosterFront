import './ItemPrecio.css';
import { useContext } from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import { getProductosSeleccionados } from '../repositorioProductosSeleccionados';

const ItemPrecio = ({ precioProducto, codigoProducto }) => {
    const { usuario, estaLogueado, esClienteDirecto } = useContext(UsuarioContext);
    const descuentoFinal = usuario?.descuento ?? 1;
    const productosSeleccionados = getProductosSeleccionados();
    const esProductoSeleccionado = productosSeleccionados.includes(codigoProducto);
    const utilidad = usuario?.utilidad ?? 0;

    const precioFinalSinDescuento = precioProducto.toFixed(2);
    const precioBruto = precioProducto.toFixed(2);
    const precioConDescuento = (precioProducto * descuentoFinal).toFixed(2);
    const precioFinalConUtilidad = (precioProducto * (1 + utilidad / 100)).toFixed(2);
    const precioFinalDescuentoUtilidad = ((precioProducto * descuentoFinal) * (1 + utilidad / 100)).toFixed(2);

    const renderPrice = (normalPrice, discountPrice, finalPrice) => (
        <div className='price-container'>
            {normalPrice && <span className="price-span-normal">{normalPrice}</span>}
            {discountPrice && <span className="price-span-descuento">{discountPrice}</span>}
            <span className="price-span-ganancia">{finalPrice}</span>
        </div>
    );

    if (esClienteDirecto()) {
        if (usuario.nombre === 'fosters' && esProductoSeleccionado) {
            return renderPrice(`Precio Final sin descuento: $${precioFinalSinDescuento}`);
        }

        if (usuario.descuento === 1) {
            return renderPrice(`Precio Bruto: $${precioBruto}`, null, `Precio Final: $${precioFinalDescuentoUtilidad}`);
        }

        if (esProductoSeleccionado) {
            return renderPrice(`Precio Final sin descuento: $${precioFinalSinDescuento}`, null, `Precio Final: $${precioFinalConUtilidad}`);
        }

        return renderPrice(`Precio Bruto: $${precioBruto}`, `Precio c/Descuento: $${precioConDescuento}`, `Precio Final: $${precioFinalDescuentoUtilidad}`);
    } 

    if (estaLogueado()) {
        if (esProductoSeleccionado) {
            return renderPrice(null, null, `Precio Final: $${precioFinalConUtilidad}`);
        }

        return renderPrice(null, null, `Precio Final: $${precioFinalDescuentoUtilidad}`);
    }

    return (
        <div className='price-container'>
            <span className="price">Consultanos!</span>
        </div>
    );
};

export default ItemPrecio;
