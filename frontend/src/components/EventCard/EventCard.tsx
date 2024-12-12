import React, { useState } from "react";
import styles from './EventCard.module.css'
import CameraModal from '../CameraModal/CameraModal'
import '../../global.css'

interface EventCardProps {
    data: {
        id: number,
        title: string,
        start_time: string,
        end_time: string,
        location: string,
        creator: string,
        status: boolean,
    }
}

const EventCard: React.FC<EventCardProps> = ({data}) => {

    const [modalVisible, setModalVisibility] = useState(false)
    const toggleVisibility = () => { setModalVisibility(!modalVisible)}

    return (
        <div className={styles.card}>
            <div className={styles.eventDetails}>
                <p className="medium-title">{data.title}</p>
                <hr />
                <p className="small-text">Location : {data.location}</p>
                <p className="small-text">Time : {data.start_time} s.d. {data.end_time}</p>
                <p className="small-text">Made by : {data.creator} </p>
                <p className="small-text">Status   : {data.status}</p>
            </div>
            <button className={styles.attendBtn} onClick={toggleVisibility}>
                {/* <img className={styles.attendBtnLogo} src={data.attend_img} alt="not found..." /> */}
                <p>{data.status}</p>
            </button>
            { modalVisible && <CameraModal onClose={toggleVisibility} id={data.id}/>}
        </div>
    )
}

export default EventCard