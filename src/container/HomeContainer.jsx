import React, { useEffect, useState } from 'react'
import Home from '../components/Home/Home'
import { getAllNanniesApi, matchingNannyApi } from '../api/home.api';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/selector';

const HomeContainer = () => {
    const [nannies, setNannies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [size, setSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [dataShow, setDataShow] = useState([]);

    const [isFilter, setIsFilter] = useState(false);

    const user = useSelector(authSelector);

    const handleChangeIsFilter = () => {
        setIsFilter(!isFilter);
    }

    const handleChangeCurrentPage = page => {
        setCurrentPage(page);
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
        const startIndex = (currentPage - 1) * size;
        const data = [...nannies].splice(startIndex, size);
        setTotalPages(Math.ceil(nannies.length / size))
        setDataShow(data);
    }, [nannies, currentPage, size])

    useEffect(() => {
        if(totalPages > 0 && currentPage > totalPages){
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages])

    useEffect(() => {
        const handleResize = () => {
            const numColumns = Math.floor((window.innerWidth - 180) / 315); // Số cột ước tính, 200px là kích thước ước lượng của StaffCard
            const numRows = 2; // Số hàng ước tính, 200px là kích thước ước lượng của StaffCard
            const maxItemsPerPage = numColumns * numRows;
            if(numColumns > 3){
                setSize(maxItemsPerPage);
            } else {
                setSize(8)
            }
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    return (
        <Home
            nannies={dataShow}
            setNannies={setNannies}
            isLoading={isLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            handleChangeCurrentPage={handleChangeCurrentPage}
            isFilter={isFilter}
            setIsFilter={handleChangeIsFilter}
            setIsLoading={setIsLoading}
        />
    )
}

export default HomeContainer