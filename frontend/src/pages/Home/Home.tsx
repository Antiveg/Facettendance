import React, { useEffect, useState } from 'react'
import EventCard from '../../components/EventCard/EventCard'
import styles from './Home.module.css'
import '../../global.css'
import axios from 'axios'

interface EventData {
    id: number,
    title: string,
    start_time: string,
    end_time: string,
    location: string,
    creator: string,
    status: boolean,
}

const Home: React.FC = () => {

    const [data, setData] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get('http://localhost:5000/events');
                setData(response.data.events);
            } catch (error) {
                console.log('Error fetching user-related events', error);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.base}>
            <div className={styles.header}>
                <h1 className='big-title'>Welcome, Guest...</h1>
                <p>Here's where all events related to you appear!</p>
            </div>
            <div className={styles.cardContainer}>
                {(data && data.length > 0) && 
                data.map((event : EventData) => (
                    <EventCard key={event.id} data={event} />
                ))}
                {(!data || data.length <= 0) && 
                <div><h2>No Event Yet...</h2></div>}
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

    // const data = [
    //     {
    //         id: 1,
    //         title: "Introduction to OOP",
    //         start_time: "01:00:00",
    //         end_time: "02:00:00",
    //         location: "binus alsut",
    //         creator: "pak felix",
    //         status: false,
    //     },
    //     {
    //         id: 1,
    //         title: "Introduction to Computational Physics",
    //         start_time: "02:00:00",
    //         end_time: "03:00:00",
    //         location: "binus alsut",
    //         creator: "pak felix",
    //         status: false,
    //     },
    //     {
    //         id: 1,
    //         title: "Introduction to Computer Network",
    //         start_time: "01:00:00",
    //         end_time: "02:00:00",
    //         location: "binus alsut",
    //         creator: "pak felix",
    //         status: false,
    //     },
    //     {
    //         id: 1,
    //         title: "Introduction to Algorithm Design & Analysis",
    //         start_time: "01:00:00",
    //         end_time: "02:00:00",
    //         location: "binus alsut",
    //         creator: "pak felix",
    //         status: false,
    //     }
    // ]