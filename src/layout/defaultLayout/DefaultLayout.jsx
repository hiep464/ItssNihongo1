import HeadederMain from '../../components/HeaderMain';

function DefaultLayout({ children }) {
    return (
        <div>
            <HeadederMain />
            {children}
        </div>
    );
}

export default DefaultLayout;
