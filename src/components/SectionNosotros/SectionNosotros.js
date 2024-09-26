import './SectionNosotros.css'; 
import FotoDuenios from '../../imagenes/staff-foster.png';
import FotoStaff from '../../imagenes/torno-mecanizado-cnc.jpg';
import LogoStaff from '../../imagenes/icono-staff.webp';
import LogoObjetivo from '../../imagenes/icono-objetivo.webp';
import LogoProgreso from '../../imagenes/icono-progreso.webp';
import {getTextNosotros} from '../repositorioNosotros';

function SectionNosotros() {

    const textosPaginaNosotros = getTextNosotros();

    return (
        <div className="container-section-nosotros" id='section-nosotros'>
            <div className='container-nosotros-title'>
                <h4>{textosPaginaNosotros.titulo}</h4>
            </div>
            <div className="container-nosotros-border">
                <div className='container-nosotros-1'>
                    <div className='nosotros-1-duenios'>
                        <img alt='Foto-duenios' src={FotoDuenios}></img>
                    </div>
                    <div className='nosotros-1-detalles'>
                        <h4 className='nosotros-1-detalles-subtitulo'>{textosPaginaNosotros.subTitulo}</h4>
                        <span>{textosPaginaNosotros.descripcion}</span>
                    </div>
                </div>
                <div className='container-nosotros-2'>
                    <div className='nosotros-2-items'>
                        <div className='nosotros-2-items-1'>
                            <div className='nosotros-2-items-1-logo'>
                                <img alt='logo-staff' src={LogoStaff}></img>
                                <span><b>{textosPaginaNosotros.titulo1}</b></span>
                            </div>
                            <div className='nosotros-2-items-1-detalle'>
                                <span>{textosPaginaNosotros.detalle1}</span>
                            </div>
                        </div>
                        <div className='nosotros-2-items-2'>
                            <div className='nosotros-2-items-2-logo'>
                                <img alt='logo-objetivo' src={LogoObjetivo}></img>
                                <span><b>{textosPaginaNosotros.titulo2}</b></span>
                            </div>
                            <div className='nosotros-2-items-2-detalle'>
                                <span>{textosPaginaNosotros.detalle2}</span>
                            </div>
                        </div>
                        <div className='nosotros-2-items-3'>
                            <div className='nosotros-2-items-3-logo'>
                                <img alt='logo-progreso' src={LogoProgreso}></img>
                                <span><b>{textosPaginaNosotros.titulo3}</b></span>
                            </div>
                            <div className='nosotros-2-items-3-detalle'>
                                <span>{textosPaginaNosotros.detalle3}</span>
                            </div>
                        </div>
                    </div>
                    <div className='nosotros-2-staff'>
                        <img alt='Foto-staff' src={FotoStaff}></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SectionNosotros;