import './ItemListContainer.css';
import ItemList from '../ItemList/ItemList';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SectionNovedades from '../SectionNovedades/SectionNovedades';
import Background from '../Background/Background';

const ItemListContainer = () => {

    const { categoria } = useParams();
    const [productos, setProductos] = useState([]);
    const [productosBase, setProductosBase] = useState([]);
    const [hayFiltros, setHayFiltros] = useState(false);
    const [titulo, setTitulo] = useState("");
  
    const TITULOS = {
      rodamientos: "Rodamientos rueda importados",
      tensoresfosters: "Tensores poly v Fosters",
      tensoresdistribucion: "Tensores distribución",
      tensoresimportados: "Tensores poly v importados",
      kitdistribucion: "Kit distribución SKF",
    };

    const PLACEHOLDERS = {
        tensoresfosters: {
          codigo_producto: '84690',
          descripcion: 'AIRE-ALTERNADOR',
          medida: '17X60X26',
          codigo_fabrica: 'VKM-33101',
          marca: 'CITROEN-CHEVROLET-FIAT-FORD-RENAULT',
          modelo: 'VARIOS',
        },
        tensoresdistribucion: {
          codigo_producto: '85518',
          descripcion: 'Distribución',
          medida: '47x38/30',
          marca: 'FORD',
          modelo: 'RANGER-FALCON-SIERRA-TAUNUS',
        },
        tensoresimportados: {
          codigo_producto: '84690 FTS IMP',
          descripcion: 'AIRE-ALTERNADOR',
          medida: '17X60X26',
          codigo_fabrica: 'VKM-33101',
          marca: 'CITROEN-CHEVROLET-FIAT-FORD-RENAULT',
          modelo: 'VARIOS',
        },
        kitdistribucion: {
            codigo_fabrica: 'VKMA-02206-A1',
          descripcion: 'Kit distribucion',
          marca: 'FIAT',
          modelo: '1.4 8V - 1.3 8V / FIRE - STRADA - SIENA - PALIO - IDEA - PUNTO - GIULIETA - MITO',
        },
        rodamientos: {
          codigo_producto: '96270',
          descripcion: 'Rueda delantera EVA',
          medida: '35x65x25',
          codigo_fabrica: '12033',
          marca: 'Renault',
          modelo: '11-9-CLIO MIO - TWINGO',
        },
        default: {
          codigo_producto: '',
          descripcion: '',
          medida: '',
          codigo_fabrica: '',
          marca: '',
          modelo: '',
        }
      };      
    
    // Fetch productos
    useEffect(() => {
        limpiarFiltro();
        fetch("https://back-fosters.azurewebsites.net/api/productos2/")
        .then((res) => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then((data) => {
            let filtrados = data;

            if (categoria) {
            filtrados = data.filter(
                (p) => p.categoria?.toLowerCase() === categoria.toLowerCase()
            );
            }

            setProductos(filtrados);
            setProductosBase(filtrados);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [categoria]);

    // Manejo del título según la categoría
    useEffect(() => {
        if (categoria) {
        setTitulo(TITULOS[categoria.toLowerCase()] || "Productos");
        } else {
        setTitulo("Productos");
        }
    }, [categoria]);

    const aplicarFiltro = () => {
        setHayFiltros(true);
    
        const getValue = (id) => {
            const el = document.getElementById(id);
            return el ? el.value.trim() : undefined;
        };
    
        const setPlaceholder = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.placeholder = text;
        };
    
        let id = getValue("filtro_codigo_producto");
        let descripcion = getValue("filtro_descripcion");
        let medida = getValue("filtro_medida");
        let codigoFabrica = getValue("filtro_codigo_fabrica");
        let marca = getValue("filtro_marca");
        let modelo = getValue("filtro_modelo");
    
        id = id === '' ? undefined : id;
        descripcion = descripcion === '' ? undefined : descripcion;
        medida = medida === '' ? undefined : medida;
        codigoFabrica = codigoFabrica === '' ? undefined : codigoFabrica;
        marca = marca === '' ? undefined : marca;
        modelo = modelo === '' ? undefined : modelo;
    
        const productoFiltrado = filtrarProductosSiHayFiltros(id, descripcion, medida, marca, modelo, codigoFabrica);
        setProductos(productoFiltrado);
    
        if(productoFiltrado.length === 1) {
            setPlaceholder("filtro_codigo_producto", productoFiltrado[0].id);
            setPlaceholder("filtro_descripcion", productoFiltrado[0].descripcion);
            setPlaceholder("filtro_medida", productoFiltrado[0].medida);
            setPlaceholder("filtro_codigo_fabrica", productoFiltrado[0].codigoFabrica);
            setPlaceholder("filtro_marca", productoFiltrado[0].marca);
            setPlaceholder("filtro_modelo", productoFiltrado[0].modelos?.toString() || '');
        } else {
            setPlaceholder("filtro_codigo_producto", '');
            setPlaceholder("filtro_descripcion", '');
            setPlaceholder("filtro_medida", '');
            setPlaceholder("filtro_codigo_fabrica", '');
            setPlaceholder("filtro_marca", '');
            setPlaceholder("filtro_modelo", '');
        }
    }
    
    const limpiarFiltro = () => {
        const setInput = (id, placeholder) => {
          const el = document.getElementById(id);
          if (el) {
            el.value = '';
            if (placeholder !== undefined) el.placeholder = placeholder;
          }
        };
      
        const ph = PLACEHOLDERS[categoria?.toLowerCase()] || PLACEHOLDERS.default;
      
        setInput("filtro_codigo_producto", ph.codigo_producto);
        setInput("filtro_descripcion", ph.descripcion);
        setInput("filtro_medida", ph.medida);
        setInput("filtro_codigo_fabrica", ph.codigo_fabrica);
        setInput("filtro_marca", ph.marca);
        setInput("filtro_modelo", ph.modelo);
      
        if (document.getElementById("filtro_codigo_producto_fabrica") && ph.codigo_producto_fabrica) {
          setInput("filtro_codigo_producto_fabrica", ph.codigo_producto_fabrica);
        }
      
        setHayFiltros(false);
      
        fetch('https://back-fosters.azurewebsites.net/api/productos2/')
          .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
          })
          .then(data => {
            let filtrados = categoria
              ? data.filter(p => p.categoria?.toLowerCase() === categoria.toLowerCase())
              : data;
            setProductos(filtrados);
          })
          .catch(err => console.log(err));
      };
      
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
                <h4>{titulo}</h4>
            </div>
            <div className='container-filtros-productos'>
                {
                    categoria?.toLowerCase() === "kitdistribucion" && (
                    <>
                        {/* Filtros especiales para Kit Distribución */}
                        <div className='container-input-filtros'>
                            <label>Código SKF o INA:</label>
                            <input type="search" id="filtro_codigo_fabrica" placeholder=''></input>
                        </div>
                        <div className='container-input-filtros'>
                            <label>Descripcion:</label>
                            <input type="search" id="filtro_descripcion"></input>
                        </div>
                        <div className='container-input-filtros'>
                            <label>Marca:</label>
                            <input type="search" id="filtro_marca"></input>
                        </div>
                        <div className='container-input-filtro-modelo'>
                            <label>Modelo:</label>
                            <input type="search" id="filtro_modelo"></input>
                        </div>
                    </>
                    )
                }
                {
                    categoria?.toLowerCase() === "rodamientos" && (
                    <>
                        {/* Filtros especiales para rodamientos */}
                        <div className='container-input-filtros'>
                            <label>Código Foster's:</label>
                            <input type="search" id="filtro_codigo_producto" placeholder=''></input>
                        </div>
                        <div className='container-input-filtros'>
                            <label>Descripcion:</label>
                            <input type="search" id="filtro_descripcion" placeholder=''></input>
                        </div>
                        <div className='container-input-filtros'>
                            <label>Por Medida:</label>
                            <input type="search" id="filtro_medida" placeholder=''></input>
                        </div>
                        <div className='container-input-filtros'>
                            <label>Código SKF o INA:</label>
                            <input type="search" id="filtro_codigo_fabrica" placeholder=''></input>
                        </div>
                        <div className='container-input-filtros'>
                            <label>Marca:</label>
                            <input type="search" id="filtro_marca" placeholder=''></input>
                        </div>
                        <div className='container-input-filtros'>
                            <label>Modelo:</label>
                            <input type="search" id="filtro_modelo" placeholder=''></input>
                        </div>
                    </>
                    )
                }
                                {
                    categoria?.toLowerCase() === "tensoresimportados" && (
                    <>
                        {/* Filtros especiales para rodamientos */}
                        <div className='container-input-filtros'>
                            <label>Código Foster's:</label>
                            <input type="search" id="filtro_codigo_producto" placeholder='Ej: 84604 FTS IMP'></input>
                        </div>
                        <div className='container-input-filtros'>
                            <label>Descripcion:</label>
                            <input type="search" id="filtro_descripcion" placeholder='Ej: tensor'></input>
                        </div>
                        <div className='container-input-filtros'>
                            <label>Por Medida:</label>
                            <input type="search" id="filtro_medida" placeholder='Ej: 17x60x26'></input>
                        </div>
                        <div className='container-input-filtros'>
                            <label>Código SKF o INA:</label>
                            <input type="search" id="filtro_codigo_fabrica" placeholder='Ej: 96270'></input>
                        </div>
                        <div className='container-input-filtros'>
                            <label>Marca:</label>
                            <input type="search" id="filtro_marca" placeholder='Ej: Peugeot'></input>
                        </div>
                        <div className='container-input-filtros'>
                            <label>Modelo:</label>
                            <input type="search" id="filtro_modelo" placeholder='Ej: 306'></input>
                        </div>
                    </>
                    )
                }
                {
                    categoria?.toLowerCase() !== "kitdistribucion" && 
                    categoria?.toLowerCase() !== "rodamientos"  && 
                    categoria?.toLowerCase() !== "tensoresimportados"&& (
                    <>
                        {/* Filtros para todos los demás */}
                        <div className='container-input-filtros'>
                            <label>Código Foster's:</label>
                            <input type="search" id="filtro_codigo_producto" placeholder='Ej: 86131'></input>
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
                            <label>Código Original:</label>
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
                    </>
                )}
            </div>
            <div className='container-filtros-botones'>
                <div id='container-input-submit-aplicar' className='container-input-submit'onClick={() => aplicarFiltro()}>
                    <div id="aplicar_filtro">Filtrar</div>
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