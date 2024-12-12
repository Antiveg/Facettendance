import React from "react";
import '../../global.css'
import styles from './CameraModal.module.css'
import FaceDetection from "../FaceDetection/FaceDetection";

interface CameraModalProps {
    onClose: () => void,
    id: number
}

const CameraModal : React.FC<CameraModalProps> = ({ onClose, id }) => {

    const data = {
        id: id,
        description: "this is event about testing out facettendance",
        title: "Introduction to OOP",
        start_time: "01:00:00",
        end_time: "02:00:00",
        location: "binus alsut",
        creator: "pak felix",
        created_at: "12:00:00",
        // join with ev.participants or ev.collaborator
        user_id: 2,
        status: "false",
        attend_img: "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg",
        collaborators: ["Budi", "Bakti", "Mari"],
        participants: ["Felix", "Maya", "Kiki"]
    }

    return (
        <div className={styles.base}>
            <div className={styles.body}>
                <button className={styles.exit_btn} onClick={onClose}><b>X</b></button>
                <div className={styles.left_part}>
                    <div className={styles.header}>
                        <p className="medium-title">PLEASE ATTEND WITH YOU FACE</p>
                        <p className="small-details">--- Please allow access to your camera ---</p>
                    </div>
                    <FaceDetection />
                    <div className={styles.notice}>
                        <p className="small-details">Please click button below to start the face verification</p>
                    </div>
                    <button className={styles.photo_btn}><h1 className="medium-">Verify</h1></button>
                </div>
                <div className={styles.right_part}>
                    <div className={styles.header}>
                        <p className="medium-title">Event Attendance Details</p>
                    </div>
                    <div className={styles.base_details}>
                        <img src={data.attend_img} alt="Not Found!" className={styles.map_img}/>
                        <div className={styles.details}>
                            <p className="small-text">Title : {data.title}</p>
                            <p className="small-text">Location : {data.location}</p>
                            <p className="small-text">Time : {data.start_time} s.d. {data.end_time}</p>
                            <p className="small-text">Made by : {data.creator} </p>
                            <p className="small-text">Collaborators : {data.status}</p>
                            <p className="small-text">Participants : {data.status}</p>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <p className="small-text">Event Description : {data.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CameraModal