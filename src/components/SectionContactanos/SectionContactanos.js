import './SectionContactanos.css';
import {Link} from 'react-router-dom';
import logoPrincipal from '../../imagenes/ISOTIPO-FOSTERS-NEGRO.png';

function SectionContactanos() {

    return (
        <div className="background-contactanos" id='section-contactanos'>
            <div className="container-section-contactanos">
            <img id='logo-navBar' className='logo-pagina-contactanos' alt='Logo' src={logoPrincipal}></img>
                <Link to = {'/productos'}>
                    <div className="buttom-contactanos">
                        <h3>Nuestros Productos</h3>
                    </div>
                </Link>
            </div>
            <div className="bottom-gradiente"></div>
        </div>
    );
}

export default SectionContactanos;