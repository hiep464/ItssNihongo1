import React, { useEffect, useState } from 'react'
import Profile from '../components/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../redux/selector'
import { useFormik } from 'formik'
import { offDualRingLoading, onDualRingLoading } from '../redux/slices/loading.slice'
import { validateProfile } from '../validation'
import { getProfileForUser, updateProfileUserApi } from '../api/profile.api'
import Swal from 'sweetalert2'
import { saveUserInfo } from '../redux/slices/auth.slice'
import { nationalities } from '../constants/nationality'

const ProfileContainer = () => {

    const user = useSelector(authSelector);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [nationHeight, setNationHeight] = useState(0)

    const formik = useFormik({
        initialValues: {
            name: '',
            nationality: '',
            phone: '',
            gender: '',
            address: '',
            want_to: '',
            password: ''
        },
        validationSchema: validateProfile,
        onSubmit: values => {
            dispatch(onDualRingLoading());
            if (user.userId) {
                const form = {
                    userInfo: {
                        address: values.address,
                        gender: values.gender,
                        name: values.name,
                        nationality: values.nationality,
                        phone: values.phone,
                        wantTo: values.want_to
                    },
                    password: values.password
                };

                if (form.password.trim().length < 1) {
                    delete form["password"]
                }

                updateProfileUserApi(user.userId, form)
                    .then(res => {
                        dispatch(offDualRingLoading())
                        setMessage(message => message + 'success')
                        Swal.fire({
                            title: 'Success',
                            text: "プロフィールの更新に成功しました！",
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        dispatch(saveUserInfo(res.data.result))
                    })
                    .catch(err => {
                        dispatch(offDualRingLoading())
                        console.log(err)
                    })
            }
        }
    })

    const handleSelectNationality = (nationality_id) => {
        const nationality = nationalities.find(item => item.id === nationality_id);
        if (nationality) {
            formik.setFieldValue("nationality", nationality.value);
            setNationHeight(0);
        }
    }

    useEffect(() => {
        if (user.userId) {
            getProfileForUser(user.userId)
                .then(res => {
                    const user_info = res.data.result.user_info;
                    const formData = { ...formik.values };
                    for (const key in user_info) {
                        if (Object.hasOwnProperty.call(formData, key)) {
                            formData[key] = user_info[key];
                        }
                    }
                    formik.setValues(formData);
                })
                .catch(err => {
                    console.log(err)
                })
        }
        //eslint-disable-next-line
    }, [user, message])

    return (
        <Profile
            formik={formik}
            handleSelectNationality={handleSelectNationality}
            nationHeight={nationHeight}
            setNationHeight={setNationHeight}
        />
    )
}

export default ProfileContainer