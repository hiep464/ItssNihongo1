import React, { useRef } from 'react'
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
            >プロファイル</Link>
            <Link className='dropdown-menu__item'
                to={ROUTE.HIRED}
                onClick={setHeight}
            >予約管理</Link>
            <div className='dropdown-menu__item'
                onClick={() => {
                    dispatch(logout());
                    setHeight();
                    navigate("/")
                }}
            >ログアウト</div>
        </AnimateHeight>
    )
}

export default DropDownMenu