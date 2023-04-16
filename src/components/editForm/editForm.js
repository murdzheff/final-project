import React, { useEffect, useState } from "react";
import userManager from "../../model/userManager";
import "./editForm.scss"
import fileToBase64 from "./fileToBase64";
import axios from "axios";
import { useNavigate } from "react-router-dom";






function EditForm(props) {

    const [firstName, setFirstName] = useState(" ");
    const [dobDay, setDobDay] = useState(" ");
    const [dobMonth, setDobMonth] = useState(" ");
    const [dobYear, setDobYear] = useState(" ");
    const [showGender, setShowGender] = useState(true);
    const [genderIdentity, setGenderIdentity] = useState(" ");
    const [genderInterest, setGenderInterest] = useState(" ");
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
            setUrl(props.loggedUser?.photos?.length ? props.loggedUser.photos : [null,null,null,null,null])
            console.log(props.loggedUser)
        }

    }, [props.loggedUser])


    const handleFileUpload = async (e,index) => {
        const file = e.target.files[0]
        const base64string = await fileToBase64(file)
        const newUrl = [...url]
        newUrl[index] = base64string;
        setUrl(newUrl)
        setActiveIndex(null)
    }


    function handleSubmit(e) {
        e.preventDefault()

        userManager.updateUser(JSON.stringify({

            formData: {
                user_id: JSON.parse(localStorage.getItem('token')).userId,
                first_name: firstName,
                dob_day: dobDay,
                dob_month: dobMonth,
                dob_year: dobYear,
                show_gender: showGender,
                gender_identity: genderIdentity,
                gender_interest: genderInterest,
                photos: url,
                about: about,
                matches: props.loggedUser.mathes
            }
        }))

        navigate("/dashboard")

    }

    return (
        <form className="editProfileForm" onSubmit={handleSubmit}>
            <div className="inputsContainer">

                <div className="personalInfo">
                    <label className="fn">
                        First Name:
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                    <label className="date">
                        Date of Birth:
                        <input type="number" value={dobDay} onChange={(e) => setDobDay(e.target.value)} placeholder="Day" />
                        <input type="number" value={dobMonth} onChange={(e) => setDobMonth(e.target.value)} placeholder="Month" />
                        <input type="number" value={dobYear} onChange={(e) => setDobYear(e.target.value)} placeholder="Year" />
                    </label>
                    <span className="checkBox">
                        Show Gender:
                        <input style={{ height: 20 }} type="checkbox" checked={showGender} onChange={(e) => setShowGender(e.target.checked)} />
                    </span>
                    <label>
                        Gender Identity:
                        <select value={genderIdentity} onChange={(e) => setGenderIdentity(e.target.value)}>
                            <option value="woman">Woman</option>
                            <option value="man">Man</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label>
                        Gender Interest:
                        <select value={genderInterest} onChange={(e) => setGenderInterest(e.target.value)}>
                            <option value="woman">Woman</option>
                            <option value="man">Man</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </div>
                <div className="photos">

                    <div className="uploads">
                        <h2>Upload your photos</h2>
                        {url.map((file, index) => (
                            <label
                                htmlFor={`file-input-${index}`}
                                key={index}
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
                        <textarea className="about" onInput={(e) => {setAbout(e.target.value)}}></textarea>
                    </div>
                </div>


            </div>




            <button type="submit">Start your journey</button>
        </form>
    );
}

export default EditForm;
