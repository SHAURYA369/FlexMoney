import React, { useState } from 'react'
import UserForm from "./UserForm";
import Loginform from "./Loginform"
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles } from '@material-ui/core';
import { Button } from "@material-ui/core";
import ShiftAndPayment from './ShiftAndPayment';
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Users() {

    const classes = useStyles();
    const [isLogin, setisLogin] = useState(0);
    const handlechange=()=>{
        setisLogin(!isLogin);
    }
    return (
        <>
            <PageHeader
                title="Yoga is the journey of the self, through the self, to the self."
                subTitle="Lets start this journey together"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                {isLogin ? <Loginform /> : <UserForm />}
            </Paper>
       
            <div style={{marginLeft: 50 }}>
                {isLogin ? <Button onClick={handlechange} variant="outlined">Dont have Account? Signup</Button>: 
                <Button onClick={handlechange} variant="outlined">Already have an account? Login</Button>}
                
            </div>

        </>
    )
}
