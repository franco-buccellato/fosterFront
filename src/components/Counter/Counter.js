import {useState, useEffect} from 'react'
import './Counter.css';
import NumericInput from 'react-numeric-input';

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

    const addCart = () => {
        let cantidadNueva = parseInt(document.getElementById('contador').value);
        /* setCount(cantidadNueva); */
        onAdd(cantidadNueva);
        setCount(inicial);
    }
    
    return(
        <div className='container-counter'>
            <NumericInput 
                id='contador'
                className="form-control" 
                value={ 1 } 
                min={ 0 } 
                max={ 100 } 
                step={ 1 } 
                precision={ 0 } 
                size={ 5 } 
            />
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