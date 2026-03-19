import './Item.css';
import { Link } from 'react-router-dom';
import ItemPrecio from '../ItemPrecio/ItemPrecio';

const Item = ({id, descripcion, marca, modelos, precio, codigoFabrica}) => {
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
        <Link to={`/detail/${id}`} className="item-link">
            <div className="el-wrapper">
                <div className="box-up">
                    <img className="img" src={imagen} alt={codigoFabrica} />
                    <div className="img-info">
                        <div className="info-inner">
                            <span className="p-id">{id}</span>
                            <span className="p-brand">MARCA: {marca}</span>
                            <span className="p-models">
                                <strong>MODELOS:</strong> {modelos.join(' - ')}
                            </span>
                        </div>
                        <div className="a-size">
                            <p className="desc-text">{descripcion}</p>
                            <ItemPrecio precioProducto={precio} codigoProducto={id} mode="hover" />
                        </div>
                    </div>
                </div>

                <div className="box-down">
                    <div className="h-bg">
                        <div className="h-bg-inner"></div>
                    </div>
                    <div className="cart-content">
                        <div className="price-wrapper-down">
                            <ItemPrecio precioProducto={precio} codigoProducto={id} />
                        </div>
                        <div className="add-to-cart">
                            {codigoFabrica ? (
                                <>
                                    <span className="txt-label">CÓDIGO EQUIVALENTE:</span>
                                    <span className="txt-code">{codigoFabrica}</span>
                                </>
                            ) : (
                                <span className="txt-code">Sin código equivalente</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
export default Item;