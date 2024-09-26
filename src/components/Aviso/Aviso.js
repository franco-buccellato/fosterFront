// import AvisoModalFoto from '../AvisoModalFoto/AvisoModalFoto';
// import AvisoModalMensaje from '../AvisoModalMensaje/AvisoModalMensaje';

// const Aviso = () => {

//     let avisoMensajeActivado = false;
//     let avisoFotoActivado = true;

//     if(avisoMensajeActivado) {
//         return (
//             <div>
//                 <AvisoModalMensaje></AvisoModalMensaje>
//             </div>
//         );
//     } else if(avisoFotoActivado) {
//         return (
//             <div>
//                 <AvisoModalFoto></AvisoModalFoto>
//             </div>
//         );
//     }


// }
// export default Aviso;
import AvisoModalFoto from '../AvisoModalFoto/AvisoModalFoto';
import AvisoModalMensaje from '../AvisoModalMensaje/AvisoModalMensaje';

const Aviso = () => {
    const avisoMensajeActivado = false;
    const avisoFotoActivado = true;

    return (
        <div>
            {avisoMensajeActivado ? <AvisoModalMensaje /> : avisoFotoActivado ? <AvisoModalFoto /> : null}
        </div>
    );
};

export default Aviso;
