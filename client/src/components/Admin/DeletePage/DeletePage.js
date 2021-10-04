import { AppBar, Container, IconButton } from '@material-ui/core'
import { Delete, KeyboardBackspace } from '@material-ui/icons'
import './style.css'

import {Link} from 'react-router-dom'
import { useState } from 'react'

import axios from 'axios'

const DeletePage = () => {

    const [name, setName] = useState('')
    const deleteItem = async () => {
        console.log("lol");
        const response = await axios.post("http://localhost:5000/doctors/delete", {
            name: name
        })
        alert(response.data)
    }

    return (
        <div className="deletePage">
            <AppBar position="sticky">
                <div className="delete__box">
                    <h1>Delete</h1>
                    <Link to="/admin">
                    <IconButton>
                        <KeyboardBackspace />
                    </IconButton>
                    </Link>
                </div>
            </AppBar>
            <Container style={{paddingTop:"50px"}}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name " />
                <div className="delete__box">
                    <IconButton onClick={deleteItem}>
                        <Delete />
                    </IconButton>
                </div>
            </Container>
        </div>
    )
}

export default DeletePage
