import React from 'react'
import AnimateHeight from 'react-animate-height'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTE } from '../../../constants/routes'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/slices/auth.slice'

const DropDownMenu = ({ height, setHeight }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <AnimateHeight className='dropdown-menu'
            height={height}
            duration={250}
        >
            <Link className='dropdown-menu__item'
                to={ROUTE.PROFILE}
                onClick={setHeight}
            >Profile</Link>
            <Link className='dropdown-menu__item'
                to={ROUTE.HIRED}
                onClick={setHeight}
            >Hired</Link>
            <div className='dropdown-menu__item'
                onClick={() => {
                    dispatch(logout());
                    setHeight();
                    navigate("/")
                }}
            >Sign out</div>
        </AnimateHeight>
    )
}

export default DropDownMenu