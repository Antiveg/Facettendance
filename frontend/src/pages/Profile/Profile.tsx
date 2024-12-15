import React, { useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  email: string;
  photos: File[];
}

const Profile: React.FC = () => {

    const [userData, setUserData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const simulatedUserData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            photos: [
                new File([''], 'photo1.jpg', { type: 'image/jpeg' }),
                new File([''], 'photo2.jpg', { type: 'image/jpeg' }),
                new File([''], 'photo3.jpg', { type: 'image/jpeg' }),
            ],
        };

        setUserData(simulatedUserData);
    }, []);

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {userData ? (
                <div className="profile-details">
                <div className="profile-info">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
                
                <div className="photos">
                    <h3>Uploaded Photos:</h3>
                    <div className="photo-gallery">
                    {userData.photos && userData.photos.length > 0 ? (
                        userData.photos.map((photo, index) => (
                        <div key={index} className="photo-item">
                            <img
                            src={URL.createObjectURL(photo)}
                            alt={`User Photo ${index + 1}`}
                            className="photo"
                            />
                        </div>
                        ))
                    ) : (
                        <p>No photos uploaded</p>
                    )}
                    </div>
                </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;