import './ItemDetailContainer.css';
import { useEffect, useState } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import clienteAxios from '../../api/axios';

const ItemDetailContainer = () => {
    const [producto, setProducto] = useState();
    const { productId } = useParams();

    useEffect(() => {
        setProducto(null); // Limpiar para mostrar loader al cambiar de ID
        
        // Usamos clienteAxios pasando los query params de forma limpia
        clienteAxios.get('/productos2/detail', { params: { id: productId } })
            .then(res => setProducto(res.data))
            .catch(err => console.error('Error fetching data:', err));
    }, [productId]);

    return (
        <main className="container-itemDetail">
            {producto ? <ItemDetail key={producto.id} {...producto}/> : <Loader />}
        </main>
    );
}
export default ItemDetailContainer;