import React, { useEffect, useState } from 'react'
import Profile from '../components/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../redux/selector'
import { useFormik } from 'formik'
import { offDualRingLoading, onDualRingLoading } from '../redux/slices/loading.slice'
import { validateProfile } from '../validation'
import { getProfileForUser, updateProfileUserApi } from '../api/profile.api'
import Swal from 'sweetalert2'

const ProfileContainer = () => {

    const user = useSelector(authSelector);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');

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
                updateProfileUserApi(user.userId, values)
                    .then(res => {
                        dispatch(offDualRingLoading())
                        setMessage(message => message + 'success')
                        Swal.fire({
                            title: 'Success',
                            text: "Successfully updated profile!",
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                    })
                    .catch(err => {
                        dispatch(offDualRingLoading())
                        console.log(err)
                    })
            }
        }
    })

    useEffect(() => {
        if (user.userId) {
            getProfileForUser(user.userId)
                .then(res => {
                    const data = res.data.result.user_info;
                    const formData = { ...formik.values };
                    for (const key in data) {
                        if (Object.hasOwnProperty.call(formData, key)) {
                            formData[key] = data[key];
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

    console.log(formik.values)

    return (
        <Profile formik={formik} />
    )
}

export default ProfileContainer