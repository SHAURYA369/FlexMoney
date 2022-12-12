import React, { useState, useEffect } from 'react'
import { Button, Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as Userservice from '../../services/UserService'
import Randomstring from 'randomstring';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const initialFValues = {
    ShiftId: '',
    DummyPaymentId: Randomstring.generate()
}




export default function UserForm() {
    const[shift,setShift]=useState("");
    const[isPlan,setisPlan]=useState(0);
    const navigate = useNavigate();
    useEffect(
        () => {
            const token=sessionStorage["token"];
            const fetchData = async () => {
                try {

                    const response = await axios.post('https://flexmoney-backend-zceq.onrender.com/GetPlan',{},
                        {
                            
                            headers: {
                                "Accept":"application/json",
                                'Content-Type': 'application/json',
                                'Authorization':`Bearer ${token}`
                                
                            }
                        }
                    );

                    if (response.data!="0") {
                        setisPlan(1);
                        setShift(Userservice.getShiftCollection()[response.data].title);
                        initialFValues.ShiftId=response.data;
                    }
                    else {
                        setisPlan(0);
                    }
                } catch (err) {
                    console.log(err);
                }
            };
            fetchData();
        },[]
    )
    const [resError, setresError] = useState("");
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('ShiftId' in fieldValues)
            temp.ShiftId = fieldValues.ShiftId.length != 0 ? "" : "This field is required."
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
    } = useForm(initialFValues, true, validate);
    const handlelogout=()=>{
        sessionStorage.clear();
        navigate('/');
    }
    const handleSubmit = async e => {
        const token=sessionStorage["token"];
        e.preventDefault()
        if (validate()) {

            try {
                await axios.post('https://flexmoney-backend-zceq.onrender.com/ChangeShift', values,{
                            
                headers: {
                    "Accept":"application/json",
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                    
                }
            });

                setShift(Userservice.getShiftCollection()[values.ShiftId-1].title);
                setisPlan(1);
            }
            catch (err) {
                console.log(err);
                setresError(err.response.data)
            }

        }
    }

    return (
        <div style={{ "marginLeft": 400 }}>
            <Form onSubmit={handleSubmit}>

                <Grid container>



                    <Grid style={{ "marginTop": 300 }} item xs={6}>
                        {isPlan ? <h1 style={{ "color": "green" }}>Your Plan is Active!</h1> : <h1 style={{ "color": "red" }}>Your Plan is Inactive!</h1>}
                        {isPlan ? <h1 style={{ "color": "green" }}>Your Shift is {shift}</h1> : null}
                        {/* <Controls.RadioGroup
                        name="Payment"
                        label="Payment"
                    /> */}
                        <Controls.Select
                            name="ShiftId"
                            label="Change Shift"
                            value={values.ShiftId}
                            onChange={handleInputChange}
                            options={Userservice.getShiftCollection()}
                            error={errors.ShiftId}
                        />
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />
                            <Button onClick={handlelogout} style={{ "marginLeft": 20 }} variant="outlined" size='large'>Logout</Button>
                            <span style={{ marginLeft: 10, color: "red" }}>{resError}</span>
                        </div>
                    </Grid>
                </Grid>
            </Form>
        </div>

    )
}
