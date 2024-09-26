import './ItemNovedad.css';

const ItemNovedad = ({id, descripcion, marca, modelos, codigoFabrica}) => {

    const cargarImagen = require.context('../../imagenes/Fotos Foster', true);
    let imagen = '';
    try {
        imagen = cargarImagen(`./${id}.jpg`);
    } catch (error) {
        imagen = cargarImagen(`./PRODUCTO SIN IMAGEN.jpg`);
    }

    return (
        <div className="container-novedades">
            
            <div className="container-item-novedades">
                <div className="page-wrapper-novedades">
                    <div className="page-inner-novedades">
                        <div className="row-novedades">
                            <div className="el-wrapper-novedades">
                                <div className="box-up-novedades">
                                    <img className="img" src={imagen} alt={codigoFabrica}></img>
                                    <div className="img-info-novedades">
                                        <div className="info-inner-novedades">
                                            <span className="p-name-novedades">{id}</span>                                        
                                            {/* <span className="p-company-novedades">Marca: {marca}</span>
                                            <span className="p-company-novedades">Modelos: {
                                                modelos.map(
                                                    unModelo => {return <span>{unModelo} </span>}
                                                )
                                            }</span> */}
                                        </div>
                                        <div className="a-size-novedades">
                                            {descripcion}
                                        </div>
                                    </div>
                                </div>
                                <div className="box-down-novedades">
                                    <div className="h-bg-novedades">
                                        <div className="h-bg-inner-novedades"></div>
                                    </div>
                                    <div className="cart-novedades" href="#-novedades">
                                    {
                                        codigoFabrica !== '' 
                                        ? 
                                        <span className="add-to-cart-novedades">
                                            <span className="txt-novedades">Código SKF o INA:</span>
                                            <span className="txt-novedades">{codigoFabrica}</span>
                                        </span>
                                        :
                                        <span className="add-to-cart-novedades">
                                            <span className="txt-novedades">Sin código SKF o INA.</span>
                                        </span>
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ItemNovedad;