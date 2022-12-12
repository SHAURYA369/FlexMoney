import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as Userservice from '../../services/UserService'
import Randomstring from 'randomstring';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    fullName: '',
    email: '',
    mobile: '',
    age: '',
    gender: 'male',
    password: '',
    // ShiftId: '',
    // DummyPaymentId:Randomstring.generate()
}

export default function UserForm() {
    const navigate = useNavigate();
    const [resError,setresError]=useState("");
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.age = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('age' in fieldValues)
            temp.age = (fieldValues.age >= '18' && fieldValues.age <= '65') ? "" : "Age limit is 18-65"
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."
        // if ('ShiftId' in fieldValues)
        //     temp.ShiftId = fieldValues.ShiftId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = async e => {
        e.preventDefault()
        if (validate()) {
            try {
                const response = await axios.post("https://flexmoney-backend-zceq.onrender.com/CreateUser", values);
                sessionStorage["token"]=response.data.token;
                navigate('/Dashboard');
            }
            catch (err) {
                console.log(err);
                setresError(err.response.data);
            }
            // resetForm()
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullName"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.Input
                        label="Age"
                        name="age"
                        value={values.age}
                        onChange={handleInputChange}
                        error={errors.age}
                    />

                </Grid>
                <Grid item xs={6}>
                  
                      <Controls.Input
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        type="password"
                    />
                    
                      <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                        
                    {/* <Controls.Select
                        name="ShiftId"
                        label="Shift"
                        value={values.ShiftId}
                        onChange={handleInputChange}
                        options={Userservice.getShiftCollection()}
                        error={errors.ShiftId}
                    /> */}
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />

                    </div>
                    <span style={{marginLeft:10, color:"red"}}>{resError}</span>
                </Grid>
            </Grid>
        </Form>
    )
}
