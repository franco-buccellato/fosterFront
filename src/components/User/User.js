import '../User/User.css';
import { useContext } from 'react';
import UsuarioContext from '../Context/UsuarioContext';
import Button from 'react-bootstrap/Button';

const UserLogin = () => {

    const {estaLogueado} = useContext(UsuarioContext);

    return (
        <div className='container-usuario'>
            {
                !estaLogueado() ?
                <Button variant="success">Iniciar Sesión</Button>
/*                 <span className="icon">
                    Iniciar Sesión
                </span>  */
                :
                <Button variant="danger">Cerrar Sesión</Button>
/*                 <span className="icon">
                    Cerrar Sesión
                </span> */
            }
        </div>
    );
}

export default UserLogin;