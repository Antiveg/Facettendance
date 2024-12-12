import React, { useState } from 'react';
import '../../global.css'
import styles from './Register.module.css'
import { Link } from 'react-router-dom'

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    photos: FileList | null;
}

interface RegisterDataError {
    name: string;
    email: string;
    password: string;
    photos: string;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        photos: null,
    });

    const [errors, setErrors] = useState<Partial<RegisterDataError>>({
        name: '',
        email: '',
        password: '',
        photos: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    // Handle file input change for photos
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({
                ...formData,
                photos: e.target.files,
            });
        }
    };

    // Validate form data
    const validateForm = (): boolean => {
        let valid = true;
        let newErrors: Partial<RegisterDataError> = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            valid = false;
        }

        if (!formData.photos || formData.photos.length < 5) {
            newErrors.photos = 'Please upload at least 5 photos';
            valid = false;
        } else if (formData.photos.length > 10) {
            newErrors.photos = 'You can upload a maximum of 10 photos';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset previous errors
        setErrors({});
        
        // Validate form data
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Handle form submission here (send data to the backend)
            console.log('Form data submitted:', formData);

            // You can replace this with an actual POST request, e.g., using axios
            // const response = await axios.post('/api/register', formData);

            // On success, you can redirect the user or show a success message
            alert('Registration successful!');

            // Reset form
            setFormData({
                name: '',
                email: '',
                password: '',
                photos: null,
            });
        } catch (error) {
            console.error('Error during registration:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.base}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className="big-title text-center">REGISTER FACETTENDANCE</h2>
                <div className={styles.input_set}>
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input
                    className={styles.input_box}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className={styles.input_set}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input
                    className={styles.input_box}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className={styles.input_set}>
                    <label className={styles.label} htmlFor="password">Password</label>
                    <input
                    className={styles.input_box}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <div className={styles.input_set}>
                    <label className={styles.label} htmlFor="photos">Upload Your Photos</label>
                    <input
                    className={styles.input_box}
                    type="file"
                    id="photos"
                    name="photos"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    />
                    {errors.photos && <span className="error">{errors.photos}</span>}
                </div>
                { (formData.photos != null) &&
                <div className={styles.img_container}>
                    {Array.from(formData.photos).map((photo, index) => (
                    <img key={index} src={URL.createObjectURL(photo)} alt={`photo-${index}`} className={styles.photo}/>
                    ))}
                </div>}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Register'}
                </button>

                <p className={styles.link}>
                Already have an account? <Link to="/login">Login Here!</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;