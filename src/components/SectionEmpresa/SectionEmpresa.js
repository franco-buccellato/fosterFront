import './SectionEmpresa.css'; 
import IconoEmpresa from '../../imagenes/icono-empresa.webp'
import {getTextEmpresa} from '../repositorioEmpresa';

function SectionEmpresa() {

    const textosPaginaEmpresa = getTextEmpresa();

    return (
        <div className="container-section-empresa" id='section-empresa'>
            <div className="container-empresa">
                <div className='container-empresa-title'>
                    <img alt='Icono Empresa' src={IconoEmpresa}></img>
                    <h4>{textosPaginaEmpresa.titulo}</h4>
                </div>
                <div className='empresa-subtitulos'>
                    <div className='empresa-subtitulo'>
                        <div className='subtitulo'>
                            <span><b>{textosPaginaEmpresa.subTitulo1}</b></span>
                        </div>
                        <div className='detalle'>
                            <span>{textosPaginaEmpresa.detalle1}</span>
                        </div>
                    </div>
                    <div className='empresa-subtitulo'>
                        <div className='subtitulo'>
                            <span><b>{textosPaginaEmpresa.subTitulo2}</b></span>
                        </div>
                        <div className='detalle'>
                            <span>{textosPaginaEmpresa.detalle2}</span>
                        </div>
                    </div>
                    <div className='empresa-subtitulo'>
                        <div className='subtitulo'>
                            <span><b>{textosPaginaEmpresa.subTitulo3}</b></span>
                        </div>
                        <div className='detalle'>
                            <span>{textosPaginaEmpresa.detalle3}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SectionEmpresa;