import React, { useEffect, useState } from 'react';
import styles from './ProfileUser.module.scss';
import axios from 'axios';

export default function ProfileUser() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [target, setTarget] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => { //useEffect la 1 ham chay ngay khi component duoc render
        getUsers();
        getCheck();
    }, []);

    function getUsers() {
        fetch('https://babybuddies-be-dev.onrender.com/api/v1/accounts/647b77348af6c322511fed59').then((result) => {
            //console.log(result);
            result.json().then((resp) => {
                //console.log(resp.result);
                //console.log(resp.result.user_info);
                setName(resp.result.user_info.name);
                setGender(resp.result.user_info.gender);
                setNationality(resp.result.user_info.nationality);
                setBirthday(resp.result.user_info.birthday);
                setAddress(resp.result.user_info.address);
                setPhone(resp.result.user_info.phone);
                setTarget(resp.result.user_info.target);
                setPassword(resp.result.password);
            });
        });
    }
    //update user
    function updateUsers() {
        var checkbox = document.getElementsByName('gender');
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked === true) {
                setGender(checkbox[i].value);
            }
        }
        var checkbox2 = document.getElementsByName('target');
        for (var i = 0; i < checkbox2.length; i++) {
            if (checkbox2[i].checked === true) {
                setTarget(checkbox2[i].value);
            }
        }
        fetch('https://babybuddies-be-dev.onrender.com/api/v1/accounts/647b77348af6c322511fed59/update', {
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
            result.json().then((resp) => {
                console.log(resp);
            });
        });
    }
    function getCheck() {
        var checkbox = document.getElementsByName('gender');
        console.log(gender);

        for (var i = 0; i < checkbox.length; i++) {
            if  (gender == "female") {
                checkbox[i].checked = true;
            }
        }
    }
    return (
        <div>
            <div className={styles.container1}>
                <div className={styles.leftBox}>
                    <label className={styles.labelName}>Name</label>
                    <input
                        className={styles.inputField}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className={styles.labelName}>Gender</label>
                    <ul className={styles.ulgender}>
                        <li className={styles.font24}>
                            <input type="radio" name="gender"  value="male" />
                            <a> Male</a>
                        </li>
                        <li className={styles.font24}>
                            <input type="radio" name="gender"  value="female" />
                            <a> Female</a>
                        </li>
                        <li className={styles.font24}>
                            <input type="radio" name="gender"  value="others" />
                            <a> Others</a>
                        </li>
                    </ul>

                    <label className={styles.labelName}>Nationnality</label>
                    <input
                        className={styles.inputField}
                        type="text"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                    />

                    <label className={styles.labelName}>Birthday</label>
                    <input
                        className={styles.inputField}
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />

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
                            <input type="radio" name="target" value="Find Child Care Staff"/>
                            <a> Find Child Care Staff</a>
                        </li>
                        <li className={styles.font24}>
                            <input type="radio" name="target" value="Find Cooking Staff" />
                            <a> Find Cooking Staff</a>
                        </li>
                        <li className={styles.font24}>
                            <input type="radio" name="target" value="Both"/>
                            <a> Both</a>
                        </li>
                        <li className={styles.font24}>
                            <input type="radio" name="target" value="Others"/>
                            <a> Others</a>
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
                        <button className={styles.CancelBtn}>Cancel</button>
                    </div>
                </div>

                <div className={styles.rightBox}>
                    <div className={styles.imgDiv}>
                        <img
                            className={styles.userImg}
                            src="https://kenh14cdn.com/thumb_w/660/2020/5/28/0-1590653959375414280410.jpg"
                            alt=""
                        />
                        <br />
                        <label className={styles.labelImg}>
                            <u>Change avata? Import hear</u>
                        </label>
                        <input className={styles.inputImg} type="file" />
                    </div>
                </div>
            </div>
        </div>
    );
}
