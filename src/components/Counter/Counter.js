import { useState, useEffect } from 'react';
import './Counter.css';
import NumericInput from 'react-numeric-input';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Counter = ({ inicial, maximoStock, onAdd }) => {
    const [count, setCount] = useState(inicial);

    const addCart = () => {
        // Obtenemos el valor actual del input directamente para asegurar precisión
        let cantidadNueva = parseInt(document.getElementById('contador').value);
        if (cantidadNueva > 0) {
            onAdd(cantidadNueva);
            setCount(inicial); // Reseteamos al valor inicial tras agregar
        }
    }

    return (
        <div className='wrapper-counter-modern'>
            <div className='input-numeric-container'>
                <NumericInput 
                    id='contador'
                    className="form-control custom-numeric" 
                    value={ count } 
                    onChange={ value => setCount(value) }
                    min={ 1 } 
                    max={ maximoStock || 100 } 
                    step={ 1 } 
                    precision={ 0 } 
                    mobile // Mejora la UX en celulares
                />
            </div>
            
            <OverlayTrigger
                placement='top'
                overlay={<Tooltip>Agregar al carrito</Tooltip>}
            >
                <button className='btn-add-cart-modern' onClick={addCart}>
                    <ion-icon name="bag-add-outline"></ion-icon>
                    <span>Agregar</span>
                </button>
            </OverlayTrigger>
        </div>
    );
}

export default Counter;