import React from 'react';
import styles from './ListNanny.module.scss';

export default function DetailNanny() {
    return (
        <div>
            <div className={styles.container1}>
                <div className={styles.leftBox}>
                    <label className={styles.labelName}>Name</label>
                    <span className={styles.inputField}></span>

                    <label className={styles.labelName}>Gender</label>
                    <ul>
                        <li className={styles.font24}>Male</li>
                    </ul>

                    <label className={styles.labelName}>Birthday</label>
                    <span className={styles.inputField}></span>

                    <label className={styles.labelName}>Address</label>
                    <span className={styles.inputField}></span>

                    <label className={styles.labelName}>Address</label>
                    <span className={styles.inputField}></span>

                    <label className={styles.labelName}>Experience of Cooking</label>
                    <span className={styles.inputField}></span>

                    <label className={styles.labelName}>Experience of Child Care</label>
                    <span className={styles.inputField}></span>

                    <label className={styles.labelName}>Languages</label>
                    <span className={styles.inputField}></span>

                    <label className={styles.labelName}>Price</label>
                    <span className={styles.staffPrice}>500000</span>
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
                <div className={styles.prevComment}>
                    <span style={{ fontWeight: 'bold', marginLeft: '16px' }}>Thanh 5</span>
                    <br />
                    <span style={{ marginLeft: '16px' }}>Trong trẻ rất tốt</span>
                </div>
            </div>
        </div>
    );
}
