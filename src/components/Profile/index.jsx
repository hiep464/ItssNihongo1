import AnimateHeight from "react-animate-height"
import { nationalities } from "../../constants/nationality"

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
                    <p className="profile-error-message">{formik.errors.name}</p>
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">国籍</label>
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
                    <p className="profile-error-message">{formik.errors.nationality}</p>
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">性別</label>
                    <div className="profile-form__input--target">
                        <div className="profile-form__input--radio">
                            <input type="radio" name="gender" id="gender-male" value="male"
                                checked={formik.values.gender === "male"}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="gender-male">男</label>
                        </div>
                        <div className="profile-form__input--radio">
                            <input type="radio" name="gender" id="gender-female" value="female"
                                checked={formik.values.gender === "female"}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="gender-female">女</label>
                        </div>
                        <div className="profile-form__input--radio">
                            <input type="radio" name="gender" id="gender-other" value="other"
                                checked={formik.values.gender === "other"}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="gender-other">他</label>
                        </div>
                    </div>
                    <p className="profile-error-message">{formik.errors.gender}</p>
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">住所</label>
                    <input type="text" name="address" className="profile-form__input"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                    />
                    <p className="profile-error-message">{formik.errors.address}</p>
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">電話番号</label>
                    <input type="text" name="phone" className="profile-form__input"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                    />
                    <p className="profile-error-message">{formik.errors.phone}</p>
                </div>
                <div className="profile-form__item profile-form__item--target">
                    <label className="profile-form__label">ニーズ</label>
                    <div className="profile-form__input--radio">
                        <input type="radio" name="want_to" id="target_find_child_care_staff" value="ChildCare"
                            checked={formik.values.want_to === "ChildCare"}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="target_find_child_care_staff">赤ちゃんの世話や料理をしてくれる人を探したい</label>
                    </div>
                    <div className="profile-form__input--radio">
                        <input type="radio" name="want_to" id="target_find_cooking_staff" value="Cooking"
                            checked={formik.values.want_to === "Cooking"}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="target_find_cooking_staff">赤ちゃんに料理を作ってくれる人を探したい</label>
                    </div>
                    <div className="profile-form__input--radio">
                        <input type="radio" name="want_to" id="input_both" value="Cooking and ChildCare"
                            checked={formik.values.want_to === "Cooking and ChildCare"}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="input_both">両方</label>
                    </div>
                    <p className="profile-error-message">{formik.errors.target}</p>
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