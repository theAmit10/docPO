import { AppBar, Button, Container, IconButton } from '@material-ui/core'
import './style.css'

import { useState } from 'react'
import FileBase64 from "react-file-base64";

import axios from 'axios';
import { Delete, KeyboardBackspace } from '@material-ui/icons';

import { Link } from 'react-router-dom';

const UpdatePage = () => {
    const [name, setName] = useState("")
    const [email, setemail] = useState("")
    const [number, setNumber] = useState("")
    const [address, setaddress] = useState("")
    const [address_point, setaddress_point] = useState("")
    const [degree, setdegree] = useState("")
    const [photo, setphoto] = useState("")
    const [appointment_time, setappointment_time] = useState("");
    const [fees, setfees] = useState("");

    const submitHandle = async (e) => {
        e.preventDefault();
        const body = {
            name: name,
            degree: degree,
            appointment_time: appointment_time,
            fees: fees,
            address: address,
            address_point: address_point,
            email: email,
            photo: photo,
            number: number,
        };
        const response = await axios
            .post("http://localhost:5000/doctors/update", body)
            .catch((err) => console.log(err.message));
        if (response.data) {
            alert('Doctor Updated!!')
        }
    }

    return (
        <div className="updatePage">
            <AppBar position="sticky" >
                <div className="update__box">
                    <h1>Update</h1>
                    <div>
                        <Link to="/delete">
                        <IconButton>
                            <Delete />
                        </IconButton>
                        </Link>
                        <Link to="/admin">
                        <IconButton>
                            <KeyboardBackspace />
                        </IconButton>
                        </Link>
                    </div>
                </div>
            </AppBar>
            <Container>
                <div className="update__form">
                    <form onSubmit={submitHandle}>
                        <span>Name</span>
                        <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        <span>Email</span>
                        <input type="email" value={email} placeholder="Email" onChange={(e) => setemail(e.target.value)} />
                        <span>Number</span>
                        <input type="text" value={number} placeholder="Number" onChange={(e) => setNumber(e.target.value)} />
                        <span>Address</span>
                        <input type="text" value={address} placeholder="Address" onChange={(e) => setaddress(e.target.value)} />
                        <span>Address Point</span>
                        <input type="text" value={address_point} placeholder="Address_Point" onChange={(e) => setaddress_point(e.target.value)} />
                        <span>Fees</span>
                        <input type="text" value={fees} placeholder="Fees" onChange={(e) => setfees(e.target.value)} />
                        <span>Timing</span>
                        <input type="text" value={appointment_time} placeholder="Appointment Time" onChange={(e) => setappointment_time(e.target.value)} />
                        <span>Photo</span>
                        <FileBase64
                            multiple={false}
                            onDone={({ base64 }) => setphoto(base64)}
                        />
                        <span>Degree</span>
                        <input type="text" value={degree} placeholder="Degree" onChange={(e) => setdegree(e.target.value)} />
                        <span></span>
                        <Button type="submit">Update</Button>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default UpdatePage
