import './ItemListContainer.css';
import ItemList from '../ItemList/ItemList';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SectionNovedades from '../SectionNovedades/SectionNovedades';
import Background from '../Background/Background';

import axios from 'axios';

const ItemListContainer = () => {

    const [productos, setProductos] = useState([]);
    const [productosBase, setProductosBase] = useState([]);

    const {id, descripcion, medida, codigoFabrica, marca, modelo} = useParams();

    const [hayFiltros, setHayFiltros] = useState(false);
    
    useEffect(() => {
        fetch('https://back-fosters.azurewebsites.net/api/productos2/')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setProductos(data);
                setProductosBase(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id, descripcion, medida, codigoFabrica, marca, modelo]);
    

    const aplicarFiltro = () => {
        setHayFiltros(true);
        let id = document.getElementById("filtro_codigo_producto").value;
        let descripcion = document.getElementById("filtro_descripcion").value;
        let medida = document.getElementById("filtro_medida").value;
        let codigoFabrica = document.getElementById("filtro_codigo_fabrica").value;
        let marca = document.getElementById("filtro_marca").value;
        let modelo = document.getElementById("filtro_modelo").value;
        id = id === '' ? undefined : id;
        descripcion = descripcion === '' ? undefined : descripcion;
        medida = medida === '' ? undefined : medida;
        codigoFabrica = codigoFabrica === '' ? undefined : codigoFabrica;
        marca = marca === '' ? undefined : marca;
        modelo = modelo === '' ? undefined : modelo;
        setProductos(filtrarProductosSiHayFiltros(id, descripcion, medida, marca, modelo, codigoFabrica));
        let productoFiltrado = filtrarProductosSiHayFiltros(id, descripcion, medida, marca, modelo, codigoFabrica);
        if(productoFiltrado.length === 1) {
            document.getElementById("filtro_codigo_producto").placeholder = productoFiltrado[0].id;
            document.getElementById("filtro_descripcion").placeholder = productoFiltrado[0].descripcion;
            document.getElementById("filtro_medida").placeholder = productoFiltrado[0].medida;
            document.getElementById("filtro_codigo_fabrica").placeholder = productoFiltrado[0].codigoFabrica;
            document.getElementById("filtro_marca").placeholder = productoFiltrado[0].marca;
            document.getElementById("filtro_modelo").placeholder = productoFiltrado[0].modelos.toString();
        } else {
            document.getElementById("filtro_codigo_producto").placeholder = '';
            document.getElementById("filtro_descripcion").placeholder = '';
            document.getElementById("filtro_medida").placeholder = '';
            document.getElementById("filtro_codigo_fabrica").placeholder = '';
            document.getElementById("filtro_marca").placeholder = '';
            document.getElementById("filtro_modelo").placeholder = '';
        }
    }

    const limpiarFiltro = () => {
        document.getElementById("filtro_codigo_producto").value = '';
        document.getElementById("filtro_descripcion").value = '';
        document.getElementById("filtro_medida").value = '';
        document.getElementById("filtro_codigo_fabrica").value = '';
        document.getElementById("filtro_marca").value = '';
        document.getElementById("filtro_modelo").value = '';
        document.getElementById("filtro_codigo_producto").placeholder = 'Ej: 84690';
        document.getElementById("filtro_descripcion").placeholder = 'Ej: ALTERNADOR';
        document.getElementById("filtro_medida").placeholder = 'Ej: 17x60x26';
        document.getElementById("filtro_codigo_fabrica").placeholder = 'Ej: VKM-36018';
        document.getElementById("filtro_marca").placeholder = 'Ej: Peugeot';
        document.getElementById("filtro_modelo").placeholder = 'Ej: 306';
        setHayFiltros(false);
        fetch('https://back-fosters.azurewebsites.net/api/productos2/')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            setProductos(data);
        })
        .catch(err => {
            console.log(err);
        });
    
        /* setProductos(filtrarProductosSiHayFiltros(productos, undefined, undefined, undefined, undefined, undefined)); */
    }

    const filtrarProductosSiHayFiltros = (
            id,
            descripcion,
            medida,
            marca,
            modelo,
            codigoFabrica
        ) => {
            let listaDeProductoFiltrados =
                id !== undefined
                    ? productosBase.filter((unProducto) =>
                        unProducto.id
                        .toString()
                        .toUpperCase()
                        .includes(id.toString().toUpperCase())
                    )
                    : productos;
            listaDeProductoFiltrados =
                descripcion !== undefined
                    ? listaDeProductoFiltrados.filter((unProducto) =>
                        unProducto.descripcion.toString().includes(descripcion.toString().toUpperCase())
                    )
                    : listaDeProductoFiltrados;
            listaDeProductoFiltrados =
                medida !== undefined
                    ? listaDeProductoFiltrados.filter((unProducto) =>
                        unProducto.medida
                        .toString()
                        .toUpperCase()
                        .includes(medida.toString().toUpperCase())
                    )
                    : listaDeProductoFiltrados;
            listaDeProductoFiltrados =
                codigoFabrica !== undefined
                    ? listaDeProductoFiltrados.filter((unProducto) =>
                        unProducto.codigoFabrica
                        .toString()
                        .toUpperCase()
                        .includes(codigoFabrica.toString().toUpperCase())
                    )
                    : listaDeProductoFiltrados;
            listaDeProductoFiltrados =
                marca !== undefined
                    ? 
                    listaDeProductoFiltrados.filter(
                        unProducto => (unProducto.marca !== "" && unProducto.marca !== undefined)
                    ).filter(
                        unProducto =>
                                unProducto.marca
                                .toString()
                                .toUpperCase()
                                .includes(marca.toString().toUpperCase())
                    )
                    : listaDeProductoFiltrados;
            listaDeProductoFiltrados =
                modelo !== undefined
                    ? listaDeProductoFiltrados.filter((unProducto) =>
                        unProducto.modelos
                        .toString()
                        .toUpperCase()
                        .includes(modelo.toString().toUpperCase())
                    )
                    : listaDeProductoFiltrados;
            console.log('listaDeProductoFiltrados');        
            console.log(listaDeProductoFiltrados);        
            return listaDeProductoFiltrados;
        }

    const handleKeyPress = (evento) => {
        let e = evento || window.event;
        if(e.keyCode === 13){
            aplicarFiltro();
        }
    }

    return (
        <div className="container-buscador" onKeyDown={() => handleKeyPress()}>
            <div className='container-titulo'>
                <h4>Nuestros Productos</h4>
            </div>
            <div className='container-filtros-productos'>
                <div className='container-input-filtros'>
                    <label>Código Foster's:</label>
                    <input type="search" id="filtro_codigo_producto" placeholder='Ej: 84690'></input>
                </div>
                <div className='container-input-filtros'>
                    <label>Descripcion:</label>
                    <input type="search" id="filtro_descripcion" placeholder='Ej: Alternador'></input>
                </div>
                <div className='container-input-filtros'>
                    <label>Por Medida:</label>
                    <input type="search" id="filtro_medida" placeholder='Ej: 17x60x26'></input>
                </div>
                <div className='container-input-filtros'>
                    <label>Código SKF o INA:</label>
                    <input type="search" id="filtro_codigo_fabrica" placeholder='Ej: VKM-36018'></input>
                </div>
                <div className='container-input-filtros'>
                    <label>Marca:</label>
                    <input type="search" id="filtro_marca" placeholder='Ej: Peugeot'></input>
                </div>
                <div className='container-input-filtros'>
                    <label>Modelo:</label>
                    <input type="search" id="filtro_modelo" placeholder='Ej: 306'></input>
                </div>
            </div>
            <div className='container-filtros-botones'>
                <div id='container-input-submit-aplicar' className='container-input-submit'onClick={() => aplicarFiltro()}>
                    <div id="aplicar_filtro">Buscar</div>
                </div>
                <div className='container-input-submit'onClick={() => limpiarFiltro()}>
                    <div id="limpiar_filtro">Limpiar</div>
                </div>
            </div>
            {
                (hayFiltros && productos.length > 0) ? <ItemList productos={productos}/> : <div className='informacion-filtros'><h3>No hay productos disponibles con esos filtros de búsqueda o no realizó ninguna búsqueda.</h3></div>
            }
            <SectionNovedades/>
            <Background/>
        </div>
    );
}
export default ItemListContainer;