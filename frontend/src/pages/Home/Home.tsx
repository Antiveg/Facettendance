import React from 'react';
import EventCard from '../../components/EventCard/EventCard'
import styles from './Home.module.css'
import '../../global.css'

const Home: React.FC = () => {

    const data = [
        {
            id: 1,
            title: "Introduction to OOP",
            start_time: "01:00:00",
            end_time: "02:00:00",
            location: "binus alsut",
            creator: "pak felix",
            status: false,
        },
        {
            id: 1,
            title: "Introduction to Computational Physics",
            start_time: "02:00:00",
            end_time: "03:00:00",
            location: "binus alsut",
            creator: "pak felix",
            status: false,
        },
        {
            id: 1,
            title: "Introduction to Computer Network",
            start_time: "01:00:00",
            end_time: "02:00:00",
            location: "binus alsut",
            creator: "pak felix",
            status: false,
        },
        {
            id: 1,
            title: "Introduction to Algorithm Design & Analysis",
            start_time: "01:00:00",
            end_time: "02:00:00",
            location: "binus alsut",
            creator: "pak felix",
            status: false,
        }
    ]

    return (
        <div className={styles.base}>
            <div className={styles.header}>
                <h1 className='big-title'>Welcome, Guest...</h1>
                <p>Here's where all events related to you appear!</p>
            </div>
            <div className={styles.cardContainer}>
                {data.map((event) => (
                    <EventCard key={event.id} data={event} />
                ))}
            </div>
        </div>
    );
};

export default Home;


// const data = [
//     {
//         id: 1,
//         details: "this is event about testing out facettendance",
//         title: "Introduction to OOP",
//         start_time: "01:00:00",
//         end_time: "02:00:00",
//         location: "binus alsut",
//         creator: "pak felix",
//         created_at: "12:00:00",
//         // join with ev.participants or ev.collaborator
//         user_id: 2,
//         status: "false",
//         attend_img: "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg",
//         collaborators: ["Budi", "Bakti", "Mari"],
//         participants: ["Felix", "Maya", "Kiki"]
//     }
// ]