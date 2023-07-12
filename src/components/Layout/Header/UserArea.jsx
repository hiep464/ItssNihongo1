import React from 'react'
import { useSelector } from 'react-redux'
import { authSelector } from '../../../redux/selector'

const UserArea = ({handleChangeHeight}) => {
    const {fullName, username} = useSelector(authSelector)
    return (
        <div className='user-area'>
            <div className="user-area__info">
                <p className="full-name">{fullName}</p>
                <p className="username">{username}</p>
            </div>
            <div className="user-area__avatar"
                onClick={handleChangeHeight}
            >
                <img src={require("../../../assets/img/avt.png")} alt="" />
            </div>
        </div>
    )
}

export default UserArea