import React, { useState, useEffect } from 'react';
import '../../global.css'
import styles from './Create.module.css'

const Create: React.FC = () => {

    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        creator: '',
        // collaborators: [],
        // participants: []
    });

    // State for form validation and error messages
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEventData({
        ...eventData,
        [name]: value,
        });
    };

    // Form validation
    const validateForm = () => {
        let formErrors: any = {};
        if (!eventData.title) formErrors.title = 'Title is required';
        if (!eventData.description) formErrors.description = 'Description is required';
        if (!eventData.start_time) formErrors.start_time = 'Start time is required';
        if (!eventData.end_time) formErrors.end_time = 'End time is required';
        if (!eventData.location) formErrors.location = 'Location is required';
        if (!eventData.creator) formErrors.location = 'Creator is required';
        return formErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Clear previous errors
        setErrors({});
    
        // Validate form data
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
        }
    
        try {
            setLoading(true);
        
            // Sending data to the backend
            // const response = await axios.post('/api/events', eventData);
            // console.log('Event created:', response.data);
        
            // Clear the form
            setEventData({
                title: '',
                description: '',
                start_time: '',
                end_time: '',
                location: '',
                creator: '',
            });
        } catch (error) {
            console.error('Error creating event:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.base}>
            <h1 className="big-title">Create New Event</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.form_inputs}>
                    <div className={styles.left_side}>
                        <div className={styles.input_container}>
                            <label htmlFor="title">Event Title</label>
                            <input
                            type="text"
                            id="title"
                            name="title"
                            value={eventData.title}
                            onChange={handleChange}
                            className={styles.input_box}
                            />
                            {errors.title && <span className="error">{errors.title}</span>}
                        </div>
                        <div className={styles.input_container}>
                            <label htmlFor="start_time">Start Time</label>
                            <input
                            type="datetime-local"
                            id="start_time"
                            name="start_time"
                            value={eventData.start_time}
                            onChange={handleChange}
                            className={styles.input_box}
                            />
                            {errors.start_time && <span className="error">{errors.start_time}</span>}
                        </div>
                        <div className={styles.input_container}>
                            <label htmlFor="end_time">End Time</label>
                            <input
                            type="datetime-local"
                            id="end_time"
                            name="end_time"
                            value={eventData.end_time}
                            onChange={handleChange}
                            className={styles.input_box}
                            />
                            {errors.end_time && <span className="error">{errors.end_time}</span>}
                        </div>
                        <div className={styles.input_container}>
                            <label htmlFor="description">Description</label>
                            <textarea
                            id="description"
                            name="description"
                            value={eventData.description}
                            onChange={handleChange}
                            className={styles.textarea_box}
                            />
                            {errors.description && <span className="error">{errors.description}</span>}
                        </div>
                        <div className={styles.input_container}>
                            <label htmlFor="creator">Creator</label>
                            <input
                            type="text"
                            id="creator"
                            name="creator"
                            value={eventData.creator}
                            onChange={handleChange}
                            className={styles.input_box}
                            />
                            {errors.creator && <span className="error">{errors.creator}</span>}
                        </div>
                        <div className={styles.input_container}>
                            <label htmlFor="location">Location</label>
                            <input
                            type="text"
                            id="location"
                            name="location"
                            value={eventData.location}
                            onChange={handleChange}
                            className={styles.input_box}
                            />
                            {errors.location && <span className="error">{errors.location}</span>}
                        </div>
                    </div>
                    <div className={styles.right_side}>
                        <img src="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg" alt="Not Found!" className={styles.map}/>
                    </div>
                </div>
                <button
                type="submit"
                disabled={loading}
                className={styles.btn}>{loading ? 'Creating...' : 'Create Event'}</button>
            </form>
        </div>
    );
};

export default Create;
