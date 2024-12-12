import React, { useState } from 'react';
// import axios from 'axios';
import '../../global.css'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'

// Define the interface for the login form data
interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
    // Define state to manage form input values
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    // Define state to manage errors
    const [errors, setErrors] = useState<Partial<LoginFormData>>({
        email: '',
        password: '',
    });

    // Define state for loading and success/error messages
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Handle input change and update form data state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Validate form inputs
    const validateForm = (): boolean => {
        let valid = true;
        let newErrors: Partial<LoginFormData> = {};

        if (!formData.email) {
            newErrors.email = 'email is required';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear previous error messages
        setLoginError('');

        // Validate the form
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Example of making a POST request to a backend for login
            // Replace this URL with your actual login API endpoint
            //   const response = await axios.post('/api/login', {
            //     name: formData.name,
            //     password: formData.password,
            //   });

            // Simulate successful login response
            // console.log('Login Successful:', response.data);

            // You can redirect the user after successful login (use React Router for this)
            // Example: navigate('/dashboard'); // If you are using react-router
            // Or store the user's data in localStorage or a global state
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setLoginError('Login failed. Please check your credentials.');
            console.error('Error during login:', error);
        }
    };

    return (
        <div className={styles.base}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className="big-title text-center">LOGIN FACETTENDENCE</h1>
                <div className={styles.input_set}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input_box}
                        placeholder="Enter your email"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className={styles.input_set}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.input_box}
                        placeholder="Enter your password"
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                {/* Error Message */}
                {loginError && <div className="error-message">{loginError}</div>}

                {/* Submit Button */}
                <button
                type="submit"
                disabled={loading}
                className={styles.btn}>
                {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className={styles.link}>
                Don't have an account yet? <Link to="/register">Register Here!</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
