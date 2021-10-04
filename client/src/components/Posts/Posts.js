import "./style.css";
import {
    AppBar,
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    IconButton,
    Typography,
} from "@material-ui/core";
import { Search, Room } from "@material-ui/icons";

import { useState, useEffect } from 'react'
import axios from 'axios'

import { Image, Transformation } from 'cloudinary-react';

const Posts = () => {

    const [search, setSearch] = useState("");
    const [doctors, setDoc] = useState("");
    const [initdoctors, setinitDoc] = useState(true);
    const [first, setFrist] = useState("")

    useEffect(async () => {
        if (initdoctors) {
            await axios.get("http://localhost:5000/doctors").then(doctor => setFrist(doctor.data)).catch(err => console.log(err))
        }
    }, []);

    useEffect(() => {
    }, [doctors])

    const findDoc = async () => {
        setinitDoc(false);
        if (search.length > 0) {
            await axios.post('http://localhost:5000/doctors/search', { search: search }).then(doc => setDoc(doc.data)).catch(err => console.log("Error -> " + err))

        } else {
            alert("Search is empty");
        }
    }

    return (
        <div className="posts">
            {/* <img src="https://wallpapercave.com/wp/wp2968511.jpg" width="100%"  /> */}
            <div className="background"></div>
            <AppBar color="transparent">
                <div className="top__box">
                    <h1 onClick={() => setinitDoc(true)} >Search</h1>
                    <input onChange={e => setSearch(e.target.value)} value={search} type="text" placeholder="Enter Your City Name" />
                    <IconButton onClick={findDoc}>
                        <Search />
                    </IconButton>
                </div>
            </AppBar>
            <Container
                style={{
                    position: "absolute",
                    top: "70px",
                    overflow: "scroll",
                    height: "89vh",
                }}
            >
                <Grid container xs={12} spacing={3}>
                    {initdoctors && first.length > 0 ? first.map(doctor => (
                        <Grid item xs={12} lg={4} key={doctor._id}>
                            <Card style={{ width: "300px" }}>
                                <CardMedia style={{ objectFit: "cover" }}>
                                    <Image cloudName="ddjlbktoe" publicId={doctor.photo}>
                                        <Transformation width="300" height="250" gravity="faces" crop="fill" />
                                    </Image>
                                </CardMedia>
                                <CardContent>
                                    <h1>{doctor.name}</h1>
                                    <span id="span_box"><p>{doctor.degree}</p> <p>Fees <strong>{doctor.fees}</strong></p> </span>
                                    <span id="span_box"> <p>Phone  </p> <Typography variant="body2" >{doctor.number}</Typography> </span>
                                    <p>{doctor.appointment_time}</p>
                                </CardContent>
                                <CardActions style={{ justifyContent: "space-between" }}>
                                    <Button color="primary" variant="outlined">
                                        <a href={doctor.address_point} >    <Room /> </a>
                                    </Button>
                                    <Button color="primary">
                                        {doctor.address}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )) :
                        doctors.length > 0 &&
                        doctors.map(doctor => (
                            <Grid item xs={12} lg={4} key={doctor._id}>
                                <Card style={{ width: "300px" }}>
                                    <CardMedia style={{ objectFit: "cover" }}>
                                        <Image cloudName="ddjlbktoe" publicId={doctor.photo} width="100%" height="100%" />
                                    </CardMedia>
                                    <CardContent>
                                        <h1>{doctor.name}</h1>
                                        <span id="span_box"><p>{doctor.degree}</p> <p>Fees <strong>{doctor.fees}</strong></p> </span>
                                        <p>{doctor.appointment_time}</p>
                                    </CardContent>
                                    <CardActions style={{ justifyContent: "space-between" }}>
                                        <Button color="primary" variant="outlined">
                                            <a href={doctor.address_point} >    <Room /> </a>
                                        </Button>
                                        <Button color="primary">
                                            {doctor.address}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </div>
    );
};

export default Posts;
