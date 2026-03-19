import './ItemPrecio.css';
import { useContext } from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import { getProductosSeleccionados } from '../repositorioProductosSeleccionados';

const ItemPrecio = ({ precioProducto, codigoProducto, mode }) => {
    const { usuario, estaLogueado, esClienteDirecto } = useContext(UsuarioContext);
    const descuentoFinal = usuario?.descuento ?? 1;
    const productosSeleccionados = getProductosSeleccionados();
    const esProductoSeleccionado = productosSeleccionados.includes(codigoProducto);
    const utilidad = usuario?.utilidad ?? 0;

    const precio = Number(precioProducto) || 0;
    const precioBruto = precio.toFixed(2);
    const precioConDescuento = (precio * descuentoFinal).toFixed(2);
    const precioFinalDescuentoUtilidad = ((precio * descuentoFinal) * (1 + utilidad / 100)).toFixed(2);
    const precioFinalConUtilidad = (precio * (1 + utilidad / 100)).toFixed(2);
    const precioFinalSinDescuento = precio.toFixed(2);

    const renderPrice = (normal, discount, final) => (
        <div className={`price-container ${mode === 'hover' ? 'on-hover' : ''}`}>
            {normal && <span className="price-old">{normal}</span>}
            {discount && <span className="price-discount">{discount}</span>}
            {final && <span className="price-main">{final}</span>}
        </div>
    );

    if (esClienteDirecto()) {
        if (usuario.nombre === 'fosters' && esProductoSeleccionado) {
            return renderPrice(null, null, `$${precioFinalSinDescuento}`);
        }
        if (usuario.descuento === 1) {
            return renderPrice(`Lista: $${precioBruto}`, null, `$${precioFinalDescuentoUtilidad}`);
        }
        if (esProductoSeleccionado) {
            return renderPrice(`Normal: $${precioFinalSinDescuento}`, null, `$${precioFinalConUtilidad}`);
        }
        return renderPrice(`Lista: $${precioBruto}`, `c/Desc: $${precioConDescuento}`, `$${precioFinalDescuentoUtilidad}`);
    } 

    if (estaLogueado()) {
        const pFinal = esProductoSeleccionado ? precioFinalConUtilidad : precioFinalDescuentoUtilidad;
        return renderPrice(null, null, `$${pFinal}`);
    }

    return (
        <div className='price-container'>
            <span className="price-consultar">Consultar precio</span>
        </div>
    );
};

export default ItemPrecio;