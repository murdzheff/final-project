import React, { useEffect, useState } from "react";
import userManager from "../../model/userManager";
import "./editForm.scss"
import fileToBase64 from "./fileToBase64";






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

    useEffect(() => {
        if (props.loggedUser) {
            setFirstName(props.loggedUser.first_name);
            setDobDay(props.loggedUser.dob_day);
            setDobMonth(props.loggedUser.dob_month);
            setDobYear(props.loggedUser.dob_year);
            setGenderIdentity(props.loggedUser.gender_identity)
            setGenderInterest(props.loggedUser.gender_interest)
            setUrl(props.loggedUser.photos || [])
            console.log(props.loggedUser)
        }

    }, [props.loggedUser])


    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const base64string = await fileToBase64(file)
        const newUrl = [...url]
        newUrl.push(base64string)
        setUrl(newUrl)
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

                    <input onChange={handleFileUpload} value={""} type="file" id="file1" name="file1" /><br />


                    <input onChange={handleFileUpload} value={""} type="file" id="file2" name="file2" /><br />


                    <input onChange={handleFileUpload} value={""} type="file" id="file3" name="file3" /><br />




                    <input onChange={handleFileUpload} value={""} type="file" id="file4" name="file4" /><br />




                    <input onChange={handleFileUpload} value={""} type="file" id="file5" name="file5" /><br />


                </div>


            </div>


            

            <button type="submit">Start your journey</button>
        </form>
    );
}

export default EditForm;
