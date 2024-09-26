import {createContext, useState} from 'react';

const UsuarioContext = createContext();

export const UsuarioContextProvider = ({children, onAdd}) => {

    const [usuario, setUsuario] = useState();

    const loguearUsuario = (nuevoUsuario) => {
        const usuario = {
            idUsuario: nuevoUsuario.idUsuario,
            nombre: nuevoUsuario.nombre,
            descuento: nuevoUsuario.descuento,
            utilidad: nuevoUsuario.utilidad,
            proveedor: nuevoUsuario.proveedor
        }
        setUsuario(usuario);
        console.log('El usuario logueado es: ' + usuario);
    }

    const estaLogueado = () => {
        return usuario !== undefined;
    }

    const desloguearUsuario = () => {
        setUsuario(usuario => {});
    }

    const esAdministrador = () => {
        return estaLogueado() ? usuario.nombre.toString().toUpperCase() === 'FOSTERS' : false;
    }

    const esClienteDirecto = () => {
        return estaLogueado() && usuario.proveedor.toString().toUpperCase() === 'FOSTERS';
    }

    const esClienteIndirecto = () => {
        return estaLogueado() ? usuario.proveedor.toString().toUpperCase() !== 'FOSTERS' : true;
    }

    return(
        <UsuarioContext.Provider value={{usuario, loguearUsuario, estaLogueado, desloguearUsuario, esAdministrador, esClienteDirecto, esClienteIndirecto}}>
            {children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioContext;