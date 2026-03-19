import './ItemDetailContainer.css';
import { useEffect, useState } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
    const [producto, setProducto] = useState();
    const { productId } = useParams();

    useEffect(() => {
        setProducto(null); // Limpiar para mostrar loader al cambiar de ID
        fetch(`https://back-fosters.azurewebsites.net/api/productos2/detail?id=${productId}`)
            .then(res => res.json())
            .then(data => setProducto(data))
            .catch(err => console.error('Error fetching data:', err));
    }, [productId]);

    return (
        <main className="container-itemDetail">
            {producto ? <ItemDetail key={producto.id} {...producto}/> : <Loader />}
        </main>
    );
}
export default ItemDetailContainer;