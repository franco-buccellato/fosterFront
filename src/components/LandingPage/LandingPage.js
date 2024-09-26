/* import SectionNosotros from '../SectionNosotros/SectionNosotros'; */
import Footer from '../Footer/Footer';
import Inicio from '../Inicio/Inicio';
import Background from '../Background/Background';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className='landing-page'>
            <Inicio/>
            {/* <SectionNosotros/> */}
            <Footer/>
            <Background/>
        </div>
    );
}
export default LandingPage;