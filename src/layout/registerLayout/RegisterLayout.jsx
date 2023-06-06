import HeaderRegister from '../../components/HeaderRegister';
import Footer from '../../components/Footer';

function RegisterLayout({ children }) {
    return (
        <div>
            <HeaderRegister />
            {children}
            <Footer />
        </div>
    );
}

export default RegisterLayout;
