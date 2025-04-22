import React, { useState } from 'react';
import '../style/recipt.css';
import axios from 'axios';

function FormComponent() {
  const [formData, setFormData] = useState({
    ingredients: '',
    steps: '',
    name:''
  });

  const [imageFile, setImageFile] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', imageFile);
    data.append('ingredients', formData.ingredients);
    data.append('steps', formData.steps);
    data.append('name', formData.name);

    try {
      const response = await axios.post('http://localhost:5002/api/recipt', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        alert('Data inserted successfully');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Data failed to submit');
    }
  };

  return (
    <form onSubmit={handleSubmit} name="form" encType="multipart/form-data">
      <h1 align="center" style={{ fontSize: '30px' }}>Recipe Sharing</h1>
      <div>
        <label>Recipe Name</label>
        <input type="text" name="name" onChange={handleChange} required />
      </div>
      <div>
        <label>Image</label>
        <input type="file" name="image" onChange={handleFileChange} required />
      </div>

      <div>
        <label>Ingredients</label>
        <textarea  name="ingredients" value={formData.ingredients} onChange={handleChange} required placeholder="Ingredients (comma-separated)" />
      </div>

      <div>
        <label>Steps</label>
        <textarea name="steps" value={formData.steps} onChange={handleChange} required placeholder="Steps (use newline for each step)" />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormComponent;
