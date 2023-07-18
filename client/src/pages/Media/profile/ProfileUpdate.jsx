import React from 'react'
import { useState,useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

function ProfileUpdate() {
  // components/ProfileUpdateForm.js
  const { user } = useContext(AuthContext);
  const [city, setCity] = useState('');
  const [fromPlace, setFromPlace] = useState('');
  const [relationship, setRelationship] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create form data to send the request
    const formData = new FormData();
    formData.append('city', city);
    formData.append('fromPlace', fromPlace);
    formData.append('relationship', relationship);
    formData.append('description', description);
    formData.append('profilePicture', profilePicture);
    formData.append('coverPicture', coverPicture);

    // Send the update request to the backend
    fetch(`/api/profile/${user.name}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response from the backend
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/><br/>
      <label htmlFor="city">City:</label>
      <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />

      <label htmlFor="fromPlace">From Place:</label>
      <input type="text" id="fromPlace" value={fromPlace} onChange={(e) => setFromPlace(e.target.value)} />

      <label htmlFor="relationship">Relationship:</label>
      <select id="relationship" value={relationship} onChange={(e) => setRelationship(e.target.value)}>
        <option value="">-- Select --</option>
        <option value="single">Single</option>
        <option value="married">Married</option>
      </select>

      <label htmlFor="description">Description:</label>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <label htmlFor="profilePicture">Profile Picture:</label>
      <input type="file" id="profilePicture" onChange={(e) => setProfilePicture(e.target.files[0])} />

      <label htmlFor="coverPicture">Cover Picture:</label>
      <input type="file" id="coverPicture" onChange={(e) => setCoverPicture(e.target.files[0])} />

      <button type="submit">Update Profile</button>
    </form>
  );
};



export default ProfileUpdate