import './style.css'
import { AppBar, Button, Container, Typography } from '@material-ui/core'

import FileBase64 from 'react-file-base64';

import React, { useState } from 'react';
import axios from 'axios'

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState("");


    const signupAdmin = async (e) => {
        e.preventDefault();
        console.log(photo);
        const response = await axios.post("http://localhost:5000/admin/auth/signup", {
            name: name,
            email: email,
            password: password,
            photo: photo,
        }).catch((err) => console.log(err.message));

        console.log(response);
        if (response)
            alert("Admin Added Successfully")
    }

    return (
        <Container maxWidth="lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center" color="primary">My Doc</Typography>
            </AppBar>
            <Container maxWidth="xl">
                <form onSubmit={signupAdmin}>
                    <label>Name</label>
                    <br />
                    <input required type="text" placeholder="Your Name" value={name} name="name" onChange={(e) => setName(e.target.value)} />
                    <br />
                    <label>Email</label>
                    <br />
                    <input required type="email" placeholder="Your Email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <label>Password</label>
                    <br />
                    <input required type="password" name="password" placeholder="Your Email" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => setPhoto(base64)} />
                    <br />

                    <Button variant="contained" color="primary" type="submit" >SignUp</Button>
                </form>
            </Container>
        </Container>
    )
}

export default Signup
