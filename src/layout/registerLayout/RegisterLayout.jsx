import HeaderRegister from '../../components/HeaderRegister';

function RegisterLayout({ children }) {
    return (
        <div>
            <HeaderRegister />
            {children}
        </div>
    );
}

export default RegisterLayout;
