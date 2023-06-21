import React from 'react';
import styles from './ListNanny.module.scss';
import { useParams } from 'react-router-dom';

export default function DetailNanny() {
    const [nannys, setNannys] = React.useState([]);
    const { id } = useParams();

    React.useEffect(() => {
        const fetchData = async () => {
            const reponse = await fetch(
                'https://babybuddies-be-dev.onrender.com/api/v1/home?fbclid=IwAR0YWt_3e9gKOT4E6uDFFe5aQl4lZ6GMheji7DLbuXTORu1V2j5x8JUrDQQ',
            );
            const reponseJSON = await reponse.json();
            setNannys(reponseJSON.result.staffs);
        };
        fetchData();
    }, []);

    const nanny = nannys.find((nanny) => nanny.id === id);
    console.log(nanny);

    function getNannyLanguages(nanny) {
        if (nanny) {
            return nanny.user_language.map(function (lang) {
                return lang.name;
            });
        }
    }
    var nannyLanguages = getNannyLanguages(nanny);
    var nannyLanguagesString = nannyLanguages ? nannyLanguages.join(', ') : '';

    return (
        <div>
            <div className={styles.container1}>
                <div className={styles.leftBox}>
                    <label className={styles.labelName}>Name</label>
                    <span className={styles.inputField}>
                        <p className={styles.inputFieldText}>{nanny ? nanny.full_name : ''}</p>
                    </span>

                    <label className={styles.labelName}>Gender</label>
                    <ul>
                        <li className={styles.font24}>{nanny ? nanny.gender : ''}</li>
                    </ul>

                    <label className={styles.labelName}>Birthday</label>
                    <span className={styles.inputField}>
                        <p className={styles.inputFieldText}>{nanny ? nanny.birthday : ''}</p>
                    </span>

                    <label className={styles.labelName}>Address</label>
                    <span className={styles.inputField}>
                        <p className={styles.inputFieldText}>{nanny ? nanny.address : ''}</p>
                    </span>

                    <label className={styles.labelName}>Experience of Cooking</label>
                    <span className={styles.inputField}>
                        <p className={styles.inputFieldText}>{nanny ? nanny.cook_exp : ''} of experience</p>
                    </span>

                    <label className={styles.labelName}>Experience of Child Care</label>
                    <span className={styles.inputField}>
                        <p className={styles.inputFieldText}>{nanny ? nanny.care_exp : ''} of experience</p>
                    </span>

                    <label className={styles.labelName}>Languages</label>
                    <span className={styles.inputField}>
                        <p className={styles.inputFieldText}>{nanny ? nannyLanguagesString : ''}</p>
                    </span>

                    <label className={styles.labelName}>Price</label>
                    <span className={styles.staffPrice}>{nanny ? nanny.salary : ''} VND/day</span>
                </div>

                <div className={styles.rightBox}>
                    <div className={styles.imgDiv}>
                        <img
                            className={styles.staffImg}
                            src="https://kenh14cdn.com/thumb_w/660/2020/5/28/0-1590653959375414280410.jpg"
                            alt=""
                        />
                    </div>
                    <div className={styles.starList}>
                        <span className={styles.greenStar}>&#9733;</span>
                        <span className={styles.greenStar}>&#9733;</span>
                        <span className={styles.greenStar}>&#9733;</span>
                        <span className={styles.greenStar}>&#9733;</span>
                        <span className={styles.greenStar}>&#9733;</span>
                    </div>
                    <div className={styles.BookOrReport}>
                        <button className={styles.BookingBtn}>Booking</button>
                        <button className={styles.ReportBtn}>Report</button>
                    </div>
                </div>
            </div>
            <div className={styles.container2}>
                <span
                    style={{ fontWeight: 'bold', marginLeft: '4px', fontSize: '20px', display: 'block', width: '100%' }}
                >
                    Write comment
                </span>
                <textarea
                    style={{
                        boxSizing: 'border-box',
                        width: '100%',
                        height: '102px',
                        backgroundColor: '#94c594',
                        border: 'none',
                    }}
                ></textarea>
            </div>
            <span className={styles.commentText}>previous comment</span>
            <div className={styles.container3}>
                {nanny &&
                    nanny.rating &&
                    nanny.rating.map((item, index) => (
                        <div key={index} className={styles.prevComment}>
                            <span style={{ fontWeight: 'bold', marginLeft: '16px' }}>
                                {item.star}
                                <span className={styles.greenStar2}>&#9733;</span>
                            </span>
                            <br />
                            <span style={{ marginLeft: '16px', display: 'block', marginBottom: '12px' }}>
                                {item.review}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
}
