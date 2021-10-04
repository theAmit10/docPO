import './style.css'

import MaterialTable from 'material-table'
import { IconButton } from '@material-ui/core'
import { Map } from '@material-ui/icons'
import { Image } from 'cloudinary-react';

const Table = ({ data }) => {
    // <img src={rowData.photo} style={{ width: 30, height: 30, borderRadius: '50%' }}
    console.log(">>> ", data);
    const data1 = [
        {
            name: "Mubeen Ansari",
            degree: "MBBS",
            appointment_time: "10:15AM to 1:00PM AND 06:00PM to 10:00PM",
            fees: [300, 500, 500],
            address: "Niyamatpura Burhanpur",
            address_point: "https://goo.gl/maps/RpqoRM3wyGo2yERW8",
            email: "mubeenashraf9530@gmail.com",
            // photo: "hbyi05njrkb8oqyrbyrm",
            photo: "https://wallpapercave.com/wp/wp1858399.jpg"
        },
        {
            name: "Mubeen Ansari",
            degree: "MBBS",
            appointment_time: "10:15AM to 1:00PM AND 06:00PM to 10:00PM",
            fees: [300, 500, 500],
            address: "Niyamatpura Burhanpur",
            address_point: "https://goo.gl/maps/RpqoRM3wyGo2yERW8",
            email: "mubeenashraf9530@gmail.com",
            // photo: "hbyi05njrkb8oqyrbyrm",
            photo: "https://wallpapercave.com/wp/wp1858399.jpg"
        },
        {
            name: "Mubeen Ansari",
            degree: "MBBS",
            appointment_time: "10:15AM to 1:00PM AND 06:00PM to 10:00PM",
            fees: [300, 500, 500],
            address: "Niyamatpura Burhanpur",
            address_point: "https://goo.gl/maps/RpqoRM3wyGo2yERW8",
            email: "mubeenashraf9530@gmail.com",
            // photo: "hbyi05njrkb8oqyrbyrm",
            photo: "https://wallpapercave.com/wp/wp1858399.jpg"
        }
    ]
    const columns = [
        { title: "Avatar", field: 'photo', render: rowData => <Image cloudName="ddjlbktoe" publicId={rowData.photo} width="150" height="160"  /> },
        { title: 'Name', field: 'name' },
        { title: 'Degree', field: 'degree' },
        { title: 'Timing', field: 'appointment_time' },
        { title: 'Address', field: 'address' },
        { title: 'Email', field: 'email' },
        { title: 'Fees', field: 'fees' },
        { title: 'Map', field: 'address_point', render: rowData => <IconButton><a href={rowData.address_point}><Map /></a></IconButton> }
    ]

    return (
        <div className="table">
            <MaterialTable
                title="Doctor's"
                data={data}
                columns={columns}
                options={{
                    exportButton: true,
                }}
                style={{
                    height: "500px",
                    overflow: "scroll"
                }}
            />
        </div>
    )
}

export default Table
