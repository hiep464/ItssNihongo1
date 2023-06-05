import Footer from '../../components/Footer';
import HeadederMain from '../../components/HeaderMain';

function DefaultLayout({ children }) {
    return (
        <div>
            <HeadederMain />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
