import {
    AppBar,
    Avatar,
    Button,
    Container,
    IconButton,
} from "@material-ui/core";
import "./style.css";

import Table from "../../table/Table";
import { useState, useEffect } from "react";

import FileBase64 from "react-file-base64";
import { ArrowBack } from "@material-ui/icons";

import { Image } from "cloudinary-react";

import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = ({ data }) => {
    const [activeForm, setFormData] = useState(false);
    const [viewProfile, setProfile] = useState(false);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [number, setnumber] = useState("");
    const [address, setaddress] = useState("");
    const [address_point, setaddress_point] = useState("");
    const [fees, setfees] = useState("");
    const [degree, setdegree] = useState("");
    const [appointment_time, setappointment_time] = useState("");
    const [doctors, setDoctors] = useState(null);

    useEffect(() => {
        getDoctors();
    }, []);

    useEffect(() => { }, [activeForm, viewProfile, doctors]);

    const getDoctors = async () => {
        await axios
            .get("http://localhost:5000/doctors")
            .then((response) => setDoctors(response.data))
            .catch((err) => console.log(err.message));
    };

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
            .post("http://localhost:5000/doctors/add", body)
            .catch((err) => console.log(err.message));
        if (response.data) {
            alert("Doctor Added!!");
            setFormData(false);
        }
    };

    let component;

    if (activeForm) {
        component = (
            <div className="popup__form">
                <div className="form_box">
                    <form onSubmit={submitHandle}>
                        <input
                            value={degree}
                            onChange={(e) => setdegree(e.target.value)}
                            placeholder="Degree"
                            name="degree"
                            type="text"
                            required
                        />
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            name="name"
                            type="text"
                            required
                        />
                        <input
                            value={number}
                            onChange={(e) => setnumber(e.target.value)}
                            placeholder="Phone Number"
                            name="number"
                            type="number"
                            required
                        />
                        <input
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                            placeholder="Address"
                            name="address"
                            type="text"
                            required
                        />
                        <input
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            placeholder="Email"
                            name="email"
                            type="email"
                            required
                        />
                        <input
                            value={address_point}
                            onChange={(e) => setaddress_point(e.target.value)}
                            placeholder="Google Map Location Link"
                            name="address_point"
                            type="text"
                            required
                        />
                        <input
                            value={fees}
                            onChange={(e) => setfees(e.target.value)}
                            placeholder="Enter Fee Structure"
                            name="fees"
                            type="text"
                            required
                        />
                        <input
                            value={appointment_time}
                            onChange={(e) => setappointment_time(e.target.value)}
                            placeholder="Available Time"
                            name="appointment_time"
                            type="text"
                            required
                        />
                        <FileBase64
                            multiple={false}
                            onDone={({ base64 }) => setPhoto(base64)}
                        />
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ marginLeft: "35%" }}
                            >
                                {" "}
                                Add
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } else if (viewProfile) {
        component = (
            <div className="profile">
                <Image
                    cloudName="ddjlbktoe"
                    publicId={data.photo}
                    width="150"
                    height="160"
                    style={{
                        borderRadius: "50%",
                        objectFit: "scaleDown",
                        marginBottom: "25px",
                    }}
                />
                <span>Hello, {data.name}</span>
                <span>Your Email is {data.email}</span>
            </div>
        );
    } else {
        component = (
            <Container>
                <div className="btn__box">
                    <Button
                        variant="contained"
                        className="btn"
                        color="primary"
                        onClick={() => setFormData(true)}
                    >
                        Add a Doctor
                    </Button>
                    <Button
                        variant="contained"
                        className="btn"
                        color="primary"
                        onClick={() => setProfile(true)}
                    >
                        View Profile
                    </Button>
                    <Button variant="contained" className="btn" color="primary">
                        <Link to="/update" style={{ color: "#fff", textDecoration: "none" }}>Update a Doctor</Link>
                    </Button>
                </div>
                {doctors && <Table data={doctors} />}
            </Container>
        );
    }

    return (
        <div>
            <AppBar position="static">
                <div className="app__bar">
                    <h2>Dashboard</h2>
                    {activeForm ? (
                        <IconButton onClick={() => setFormData(false)}>
                            <ArrowBack />
                        </IconButton>
                    ) : (
                        <></>
                    )}
                    {viewProfile ? (
                        <IconButton onClick={() => setProfile(false)}>
                            <ArrowBack />
                        </IconButton>
                    ) : (
                        <></>
                    )}
                </div>
            </AppBar>
            {component}
        </div>
    );
};

export default Dashboard;
