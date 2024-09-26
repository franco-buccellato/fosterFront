import './ItemList.css';
import Item from '../Item/Item';

const ItemList = ({productos}) => {

    return (
        <div className="container-itemList">
            {productos.map(producto => <Item key={producto.id} {...producto}/>)}
        </div>
    );
}
export default ItemList;