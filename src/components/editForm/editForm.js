import React, { useEffect, useState } from "react";
import userManager from "../../model/userManager";
import "./editForm.scss"
import fileToBase64 from "./fileToBase64";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";





function EditForm(props) {
    const location = useLocation()
    const [firstName, setFirstName] = useState(" ");
    const [dobDay, setDobDay] = useState(" ");
    const [dobMonth, setDobMonth] = useState(" ");
    const [dobYear, setDobYear] = useState(" ");
    const [showGender, setShowGender] = useState(true);
    const [genderIdentity, setGenderIdentity] = useState(" ");
    const [genderInterest, setGenderInterest] = useState(" ");
    const [ageInterest, setAgeInterest] = useState("30")
    const [url, setUrl] = useState([])
    const [about, setAbout] = useState(" ");
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.loggedUser) {
            setFirstName(props.loggedUser.first_name);
            setDobDay(props.loggedUser.dob_day);
            setDobMonth(props.loggedUser.dob_month);
            setDobYear(props.loggedUser.dob_year);
            setGenderIdentity(props.loggedUser.gender_identity)
            setGenderInterest(props.loggedUser.gender_interest)
            setAgeInterest(props.loggedUser.age_interest || 30)
            setAbout(props.loggedUser.about);



            if (props.loggedUser.photos === undefined) {
                setUrl()
            } else if (props.loggedUser.photos.length === 1) {
                setUrl([...props.loggedUser.photos, null, null, null, null])
            } else if (props.loggedUser.photos.length === 2) {
                setUrl([...props.loggedUser.photos, null, null, null])
            } else if (props.loggedUser.photos.length === 3) {
                setUrl([...props.loggedUser.photos, null, null])
            } else if (props.loggedUser.photos.length === 4) {
                setUrl([...props.loggedUser.photos, null])
            } else if (props.loggedUser.photos.length === 5) {
                setUrl([...props.loggedUser.photos])
            }


        }
    }, [location])


    const handleFileUpload = async (e, index) => {


        const file = e.target.files[0]
        const base64string = await fileToBase64(file)
        const newUrl = [...url]
        newUrl[index] = base64string;
        setUrl(newUrl)
        setActiveIndex(null)
    }


    function resetFile(index) {
        setUrl((prevUrls) => {
            const newUrls = [...prevUrls];
            newUrls[index] = null;
            return newUrls;
        });
        setActiveIndex(null);
    }

    function handleSubmit(e) {

        if (url.filter(e => e !== null).length > 1) {
            const updatedUser = {
                user_id: props.loggedUser.user_id,
                first_name: firstName,
                dob_day: dobDay,
                dob_month: dobMonth,
                dob_year: dobYear,
                show_gender: showGender,
                gender_identity: genderIdentity,
                gender_interest: genderInterest,
                age_interest: ageInterest,
                photos: url,
                about: about,
                matches: props.loggedUser.matches
            }

            userManager.updateUser(JSON.stringify({

                formData: updatedUser

            })).then(response => {
                props.setLoggedUser(updatedUser)
                navigate("/dashboard")
            })


        }
        e.preventDefault()

    }

    return (
        <form className="editProfileForm" onSubmit={handleSubmit}>
            <div className="inputsContainer">

                <div className="personalInfo">
                    <label className="fn">
                        First Name:
                        <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                    <label className="date">
                        Date of Birth:
                        <input type="number" required value={dobDay} onChange={(e) => setDobDay(e.target.value)} placeholder="Day" />
                        <input type="number" required value={dobMonth} onChange={(e) => setDobMonth(e.target.value)} placeholder="Month" />
                        <input type="number" required value={dobYear} onChange={(e) => setDobYear(e.target.value)} placeholder="Year" />
                    </label>
                    <span className="checkBox">
                        Show Gender:
                        <input
                            style={{ height: 20 }}
                            type="checkbox"
                            checked={showGender}
                            onChange={(e) => setShowGender(e.target.checked)}
                        />
                    </span>
                    <label>
                        Gender Identity:
                        <select value={genderIdentity} required onChange={(e) => setGenderIdentity(e.target.value)}>
                            <option value="woman">Woman</option>
                            <option value="man">Man</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label>
                        Gender Interest:
                        <select value={genderInterest} required onChange={(e) => setGenderInterest(e.target.value)}>
                            <option value="woman">Woman</option>
                            <option value="man">Man</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label>
                        Age Interest:
                        <input
                            type="number"
                            name="age"
                            className="age"
                            min="18"
                            placeholder="Enter your age (minimum 18)"
                            value={ageInterest}
                            required
                            onInput={(e) => setAgeInterest(e.target.value)}
                        />
                    </label>
                </div>
                <div className="photos">

                    <div className="uploads">
                        <h2>Upload your photos</h2>
                        <p>Please upload a minimum of two photos</p>
                        {url.map((file, index) => (
                            <div style={{ position: "relative" }} key={index}>
                                <label
                                    htmlFor={`file-input-${index}`}
                                    style={{
                                        backgroundColor: file ? "white" : "lightgray",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        width: "80px",
                                        height: "100px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        marginRight: "10px",
                                        objectFit: "contain",
                                        overflow: "hidden",
                                        borderRadius: "10px"
                                    }}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    {file ? (
                                        <img className="uploadImg" src={file} alt="uploaded file" />
                                    ) : (
                                        `Upload file ${index + 1}`
                                    )}
                                </label>
                                {file && (
                                    <button className="resetPhoto"
                                        style={{
                                            position: "absolute",
                                            top: "0px",
                                            bottom: "5px",
                                            right: "5px",
                                            border: "none",
                                            cursor: "pointer",
                                            height: "5px",
                                            width: "30px",
                                            borderRadius: "50%"
                                        }}
                                        onClick={() => resetFile(index)}
                                    >
                                        X
                                    </button>
                                )}
                                {activeIndex === index && (
                                    <input
                                        id={`file-input-${index}`}
                                        type="file"
                                        onChange={(event) => handleFileUpload(event, index)}
                                        style={{ display: "none" }}
                                    />
                                )}
                            </div>
                        ))}

                        {activeIndex !== null && (
                            <input
                                id={`file-input-${activeIndex}`}
                                type="file"
                                onChange={(event) => handleFileUpload(event, activeIndex)}
                                style={{ display: "none" }}
                            />
                        )}
                    </div>

                    <div>
                        <textarea required
                            value={about}
                            placeholder="Tell us something about yourself"
                            className="about"
                            onInput={(e) => { setAbout(e.target.value) }}></textarea>
                    </div>
                </div>


            </div>




            <button type="submit">Start your journey</button>
        </form>
    );
}

export default EditForm;
