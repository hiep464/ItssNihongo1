const Profile = ({ formik }) => {
    return (
        <div className="main-session profile-container">
            <form className="profile-form"
                onSubmit={formik.handleSubmit}
            >
                <div className="profile-form__item">
                    <label className="profile-form__label">Name</label>
                    <input type="text" name="name" className="profile-form__input"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    <p className="profile-error-message">{formik.errors.name}</p>
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">Nationality</label>
                    <input type="text" name="nationality" className="profile-form__input"
                        value={formik.values.nationality}
                        onChange={formik.handleChange}
                    />
                    <p className="profile-error-message">{formik.errors.nationality}</p>
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">Gender</label>
                    <div className="profile-form__input--target">
                        <div className="profile-form__input--radio">
                            <input type="radio" name="gender" id="gender-male" value="male"
                                checked={formik.values.gender === "male"}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="gender-male">Male</label>
                        </div>
                        <div className="profile-form__input--radio">
                            <input type="radio" name="gender" id="gender-female" value="female"
                                checked={formik.values.gender === "female"}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="gender-female">Female</label>
                        </div>
                        <div className="profile-form__input--radio">
                            <input type="radio" name="gender" id="gender-other" value="other"
                                checked={formik.values.gender === "other"}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="gender-other">Other</label>
                        </div>
                    </div>
                    <p className="profile-error-message">{formik.errors.gender}</p>
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">Address</label>
                    <input type="text" name="address" className="profile-form__input"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                    />
                    <p className="profile-error-message">{formik.errors.address}</p>
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">Phone</label>
                    <input type="text" name="phone" className="profile-form__input"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                    />
                    <p className="profile-error-message">{formik.errors.phone}</p>
                </div>
                <div className="profile-form__item profile-form__item--target">
                    <label className="profile-form__label">Target</label>
                    <div className="profile-form__input--radio">
                        <input type="radio" name="want_to" id="target_find_child_care_staff" value="ChildCare"
                            checked={formik.values.want_to === "ChildCare"}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="target_find_child_care_staff">Find Child Care Staff</label>
                    </div>
                    <div className="profile-form__input--radio">
                        <input type="radio" name="want_to" id="target_find_cooking_staff" value="Cooking"
                            checked={formik.values.want_to === "Cooking"}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="target_find_cooking_staff">Find Cooking Staff</label>
                    </div>
                    <div className="profile-form__input--radio">
                        <input type="radio" name="want_to" id="input_both" value="Cooking and ChildCare"
                            checked={formik.values.want_to === "Cooking and ChildCare"}
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="input_both">Both</label>
                    </div>
                    <p className="profile-error-message">{formik.errors.target}</p>
                </div>
                <div className="profile-form__item">
                    <label className="profile-form__label">Password</label>
                    <input type="password" name="password" className="profile-form__input"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {/* <p className="profile-error-message">{formik.errors.password}</p> */}
                </div>
                <div className="profile-form__buttons">
                    <input type="submit" value="Save"
                        className="profile-form__buttons--submit"
                    />
                    <input type="reset" value="Cancel"
                        className="profile-form__buttons--reset"
                    />
                </div>
            </form>
        </div>
    )
}

export default Profile