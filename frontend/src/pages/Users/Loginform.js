import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const initialFValues = {
    email: '',
    password:'',
}
// const[isCorrectCredentials,setsCorrectCredentials]=useState(0);

export default function UserForm() {
    const navigate = useNavigate();
    const [resError,setresError]=useState("");

    const validate = (fieldValues = values) => {
        let temp = { ...errors}
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('password' in fieldValues)
         temp.password = fieldValues.password ? "" : "This field is required."
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
    
    const handleSubmit =async e => {
        e.preventDefault()
        if (validate()) {
            try {
                const response=await axios.post("https://flexmoney-backend-zceq.onrender.com/Login",values);
                sessionStorage["token"]=response.data.token;
                navigate('/Dashboard');
                
            }
            catch (err) {
                console.log(err);
                setresError(err.response.data);
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
               
                <Grid item xs={6}>
                <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" 
                            error={errors.wp}
                            />
                            <span style={{marginLeft:10, color:"red"}}>{resError}</span>
                    </div>
                </Grid>
            </Grid>
        </Form>
        
    )
}
