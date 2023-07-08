import React, { useContext, useEffect, useState } from 'react'
import Home from '../components/Home/Home'
import { getAllNanniesApi, matchingNannyApi } from '../api/home.api';

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

    const isLogin = localStorage.getItem('isLogin');

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

    const handleFilterFromProfile = () => {
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
                console.log(res);
                setNannies(res.data)
                setIsLoading(false)
            })
            .catch(err => {

            })
    };

    useEffect(() => {
        if (isLogin) {
            handleFilterFromProfile();
        } else {
            setIsLoading(true);
            getAllNanniesApi()
                .then(res => {
                    const data = [...res.data.result.staffs];
                    setIsLoading(false);
                    setNannies(data);
                    setTotalPages(Math.ceil(data.length / paging.size));
                })
                .catch(err => {

                })
        }
        //eslint-disable-next-line
    }, [isLogin])

    useEffect(() => {
        handleChangeShowData(paging.currentPage, nannies);
        //eslint-disable-next-line
    }, [nannies, paging.currentPage])

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
            setIsLoading = {setIsLoading}
        />
    )
}

export default HomeContainer