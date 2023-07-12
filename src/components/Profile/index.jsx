import AnimateHeight from "react-animate-height"
import { genders, nationalities, want_to } from "../../constants/profile";

const Profile = ({ formik, handleSelectNationality, nationHeight, setNationHeight }) => {

    return (
        <div className="main-session profile-container">
            <form className="profile-form"
                onSubmit={formik.handleSubmit}
            >
                <div className="profile-form__item">
                    <label className="profile-form__label">名前</label>
                    <input type="text" name="name" className="profile-form__input"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {/* <p className="profile-error-message">{formik.errors.name}</p> */}
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">言語</label>
                    <input type="text" name="nationality" className="profile-form__input"
                        value={formik.values.nationality}
                        readOnly
                        onClick={() => {
                            setNationHeight(nationHeight === 0 ? "auto" : 0);
                        }}
                    />
                    <AnimateHeight
                        duration={300}
                        height={nationHeight}
                        className="animate-height--nationality"
                    >
                        <div className="select-nationality">
                            {nationalities.map(item => (
                                <div className="select-nationality__item" key={item.id}
                                    onClick={() => {
                                        handleSelectNationality(item.id)
                                    }}
                                >{item.value}</div>
                            ))}
                        </div>
                    </AnimateHeight>
                    {/* <p className="profile-error-message">{formik.errors.nationality}</p> */}
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">性別</label>
                    <div className="profile-form__input--target">
                        {genders.map(gender => (
                            <div className="profile-form__input--radio" key={gender.id}>
                                <input type="radio" name="gender" id={gender.id} value={gender.value}
                                    checked={formik.values.gender === gender.value}
                                    onChange={formik.handleChange}
                                />
                                <label htmlFor={gender.id}>{gender.label}</label>
                            </div>
                        ))}
                    </div>
                    {/* <p className="profile-error-message">{formik.errors.gender}</p> */}
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">住所</label>
                    <input type="text" name="address" className="profile-form__input"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                    />
                    {/* <p className="profile-error-message">{formik.errors.address}</p> */}
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">電話番号</label>
                    <input type="text" name="phone" className="profile-form__input"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                    />
                    {/* <p className="profile-error-message">{formik.errors.phone}</p> */}
                </div>
                <div className="profile-form__item profile-form__item--target">
                    <label className="profile-form__label">ニーズ</label>
                    {want_to.map(item => (
                        <div className="profile-form__input--radio" key={item.id}>
                            <input type="radio" name="want_to" id={item.id} value={item.value}
                                checked={formik.values.want_to === item.value}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor={item.id}>{item.label}</label>
                        </div>
                    ))}

                    {/* <p className="profile-error-message">{formik.errors.target}</p> */}
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">パスワード</label>
                    <input type="password" name="password" className="profile-form__input"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {/* <p className="profile-error-message">{formik.errors.password}</p> */}
                </div>
                <div className="profile-form__buttons">
                    <input type="submit" value="保存"
                        className="profile-form__buttons--submit"
                    />
                    <input type="reset" value="キャンセル"
                        className="profile-form__buttons--reset"
                    />
                </div>
            </form>
        </div>
    )
}

export default Profile