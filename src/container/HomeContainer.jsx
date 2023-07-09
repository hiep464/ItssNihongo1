import React, { useEffect, useState } from 'react'
import Home from '../components/Home/Home'
import { getAllNanniesApi, matchingNannyApi } from '../api/home.api';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/selector';

const HomeContainer = () => {
    const [nannies, setNannies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [paging, setPaging] = useState({
        currentPage: 1,
        size: 8,
        data: []
    })
    const [isFilter, setIsFilter] = useState(false);

    const user = useSelector(authSelector);

    const handleChangeIsFilter = () => {
        setIsFilter(!isFilter);
    }

    const handleChangeCurrentPage = page => {
        setPaging({
            ...paging,
            currentPage: page
        })
    }

    const handleChangeShowData = (currentPage, nannies) => {
        const startIndex = (currentPage - 1) * paging.size;
        const data = [...nannies].splice(startIndex, paging.size);
        setPaging({
            ...paging,
            data: data
        })
    }

    const handleFilterFromProfile = (profile) => {
        const languageF = localStorage.getItem('language');
        const cookingF = localStorage.getItem('cooking') + ' years';
        const childCareF = localStorage.getItem('childCare') + ' years';

        let formData = {
            userLanguage: languageF?.length === 1 ? languageF[0] : languageF,
            cookExp: cookingF.length === 1 ? cookingF[0] : cookingF,
            careExp: childCareF.length === 1 ? childCareF[0] : childCareF,
        };
        if (languageF?.length === 0) {
            delete formData.userLanguage;
        }

        if (cookingF.length === 0) {
            delete formData.cookExp;
        }

        if (childCareF.length === 0) {
            delete formData.careExp;
        }

        setIsLoading(true)
        matchingNannyApi(formData)
            .then(res => {
                setNannies(res.data)
                setIsLoading(false)
            })
            .catch(err => {

            })
    };

    useEffect(() => {
        if (user.user_info) {
            handleFilterFromProfile(user.user_info);
        } else {
            setIsLoading(true);
            getAllNanniesApi()
                .then(res => {
                    const data = [...res.data.result.staffs];
                    setIsLoading(false);
                    setNannies(data);
                })
                .catch(err => {

                })
        }
        //eslint-disable-next-line
    }, [user])

    useEffect(() => {
        handleChangeShowData(paging.currentPage, nannies);
        //eslint-disable-next-line
    }, [nannies, paging.currentPage])

    useEffect(() => {
        setTotalPages(Math.ceil(nannies.length / paging.size))
    }, [nannies, paging])

    return (
        <Home
            nannies={paging.data}
            setNannies={setNannies}
            isLoading={isLoading}
            currentPage={paging.currentPage}
            totalPages={totalPages}
            handleChangeCurrentPage={handleChangeCurrentPage}
            isFilter={isFilter}
            setIsFilter={handleChangeIsFilter}
            setIsLoading={setIsLoading}
        />
    )
}

export default HomeContainer