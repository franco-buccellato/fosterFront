import {useState, useEffect} from 'react'
import './Counter.css';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Counter = ({inicial, maximoStock, onAdd}) => {
    console.log(inicial);
    console.log(maximoStock);

    const [count, setCount] = useState(inicial);

    useEffect(() => {
        console.log('Se modifico el count.')
    },
    [count] //Escucha evento de montaje
    )

    const decrement = () => {
        count >= inicial ? setCount(count -1) : console.log('Mínimo stock.');
    }

    const increment = () => {
        //count < maximoStock ? setCount(count + 1) : console.log("Máximo stock.");
        setCount(count + 1);
    }

    const addCart = () => {
        onAdd(count);
        setCount(inicial);
    }

    console.log('Montando componente.');
    
    return(
        <div className='container-counter'>
            <OverlayTrigger
                placement='bottom'
                overlay={
                    <Tooltip>
                        <strong>Decrementar unidades</strong>
                    </Tooltip>
                }
            >
                <div className='button-counter' onClick={decrement}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                </div>
            </OverlayTrigger>
            <h4>{count}</h4>
            <OverlayTrigger
                placement='top'
                overlay={
                    <Tooltip>
                        <strong>Incrementar unidades</strong>
                    </Tooltip>
                }
            >
                <div className='button-counter' onClick={increment}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                </div>
            </OverlayTrigger>
            <OverlayTrigger
                placement='right'
                overlay={
                    <Tooltip>
                        <strong>Agegar al carrito</strong>
                    </Tooltip>
                }
            >
                <div className='button-counter' onClick={addCart}>
                    <ion-icon name="bag-add-outline"></ion-icon>
                </div>
            </OverlayTrigger>
        </div>
    )

}

export default Counter;