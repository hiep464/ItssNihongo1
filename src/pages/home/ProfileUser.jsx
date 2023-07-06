import React, { useEffect, useState } from 'react';
import styles from './ProfileUser.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function ProfileUser() {
    const { userId, setUserId, updated, setUpdated } = React.useContext(AuthContext);
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [target, setTarget] = useState('');
    const [password, setPassword] = useState('');
    const { userId: routeParams } = useParams();
    const [inputError, setInputError] = useState(false);
    const isLogin = localStorage.getItem('isLogin');
    const isUpdated = localStorage.getItem('isUpdated');

    const language = {
        Vietnam: 'Vietnamese',
        England: 'English',
        Japan: 'Japanese',
        French: 'French',
        Spanin: 'Spanish',
        China: 'Chinese',
    };

    useEffect(() => {
        //useEffect la 1 ham chay ngay khi component duoc render
        getUsers();
    }, [userId, updated]);

    function getUsers() {
        const url = 'https://babybuddies-be-dev.onrender.com/api/v1/accounts/' + routeParams;
        axios
            .get(url)
            .then(function (response) {
                // handle success
                console.log(response);
                const data = response.data.result.user_info;
                console.log(data);
                if (data) {
                    setName(data.name);
                    setNationality(data.nationality);
                    setPhone(data.phone);
                    setAddress(data.address);
                    setTarget(data.want_to);
                    setGender(data.gender);
                    setPassword(response.data.result.password);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }
    // update user
    function updateUsers() {
        if (!nationality || !address || !target) {
            setInputError(true);
            return;
        }
        const url = 'https://babybuddies-be-dev.onrender.com/api/v1/accounts/' + routeParams + '/update';
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_info: {
                    name: name,
                    gender: gender,
                    nationality: nationality,
                    birthday: birthday,
                    address: address,
                    phone: phone,
                    want_to: target,
                    password: password,
                },
            }),
        }).then((result) => {
            localStorage.setItem('language', language[nationality]);
            localStorage.setItem('address', address);
            if (target === 'ChildCare') {
                localStorage.setItem('childCare', 1);
                localStorage.removeItem('cooking');
            }
            if (target === 'Cooking') {
                localStorage.setItem('cooking', 1);
                localStorage.removeItem('childCare');
            }
            if (target === 'Cooking and ChildCare') {
                localStorage.setItem('childCare', 1);
                localStorage.setItem('cooking', 1);
            }
            console.log(result);
            localStorage.setItem('isUpdated', true);
            window.location.href = '/home';
        });
    }
    function cancelUpdate() {
        if (isLogin && isUpdated) {
            window.location.href = '/home';
        } else {
            localStorage.setItem('isLogin', false);
            window.location.href = '/login';
        }
    }
    return (
        <div>
            <div className={styles.container1}>
                <div className={styles.leftBox}>
                    {inputError && <div className={styles.errorMsg}>Please fill in all fields!</div>}
                    <label className={styles.labelName}>Name</label>
                    <input
                        className={styles.inputField}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className={styles.labelName}>Nationnality</label>
                    <input
                        className={styles.inputField}
                        type="text"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                    />
                    <label className={styles.labelName}>Gender</label>

                    <ul className={styles.ulgender}>
                        <li className={styles.font24}>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <a> Male</a>
                        </li>
                        <li className={styles.font24}>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <a> Female</a>
                        </li>
                        <li className={styles.font24}>
                            <input
                                type="radio"
                                name="gender"
                                value="others"
                                checked={gender === 'others'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <a> Others</a>
                        </li>
                    </ul>

                    <label className={styles.labelName}>Address</label>

                    <input
                        className={styles.inputField}
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <label className={styles.labelName}>Phone</label>
                    <input
                        className={styles.inputField}
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <label className={styles.labelName}>Target</label>
                    <ul className={styles.ultarget}>
                        <li className={styles.font24}>
                            <input
                                type="radio"
                                name="target"
                                value="ChildCare"
                                checked={target === 'ChildCare'}
                                onChange={(e) => setTarget(e.target.value)}
                            />
                            <a> Find Child Care Staff</a>
                        </li>
                        <li className={styles.font24}>
                            <input
                                type="radio"
                                name="target"
                                value="Cooking"
                                checked={target === 'Cooking'}
                                onChange={(e) => setTarget(e.target.value)}
                            />
                            <a> Find Cooking Staff</a>
                        </li>
                        <li className={styles.font24}>
                            <input
                                type="radio"
                                name="target"
                                value="Cooking and ChildCare"
                                checked={target === 'Cooking and ChildCare'}
                                onChange={(e) => setTarget(e.target.value)}
                            />
                            <a> Both</a>
                        </li>
                    </ul>

                    <label className={styles.labelName}>Password</label>
                    <input
                        className={styles.inputFieldPass}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className={styles.SaveOrCancel}>
                        <button className={styles.SaveBtn} onClick={updateUsers}>
                            Save
                        </button>
                        <button className={styles.CancelBtn} onClick={cancelUpdate}>
                            Cancel
                        </button>
                    </div>
                </div>

                <div className={styles.rightBox}></div>
            </div>
        </div>
    );
    /*
    <label className={styles.labelImg}>
        <u>Change avata? Import hear</u>
    </label>
    <input className={styles.inputImg} type="file" />
    */
}
