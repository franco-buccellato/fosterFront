import './ItemDetailContainer';
import './ItemDetailContainer.css'
import { useEffect, useState } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetailContainer = () => {

    const [producto, setProducto] = useState();

    const {productId} = useParams();

    useEffect(
        () => {
            fetch(`https://back-fosters.azurewebsites.net/api/productos2/detail?id=${productId}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(data => {
                    setProducto(data);
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                });
        }, [productId]
    );
    

    return (
        <div className="container-itemDetail">
            {
                producto ? <ItemDetail key={producto.id} {...producto}/> : <Loader />
            }
        </div>
    );
}
export default ItemDetailContainer;