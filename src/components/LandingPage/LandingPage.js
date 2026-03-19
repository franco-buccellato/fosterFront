import Footer from '../Footer/Footer';
import Inicio from '../Inicio/Inicio';
import Background from '../Background/Background';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className='landing-page'>
            <Inicio />
            {/* Aquí podrías insertar una sección de Beneficios/Categorías luego */}
            <Footer />
            <Background />
        </div>
    );
}
export default LandingPage;