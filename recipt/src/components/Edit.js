import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/recipt.css';

function Edit()
 {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState
  ({
    name: '',
    ingredients: '',
    steps: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/recipt/${id}`);
        const { name, ingredients, steps, imagePath } = response.data;
        setFormData({ name, ingredients, steps });
        setExistingImage(imagePath); 
      } 
      catch (error)
       {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleInputChange = (e) => 
    {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => 
{
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => 
{
    e.preventDefault();
    const updatedForm = new FormData();
    updatedForm.append('name', formData.name);
    updatedForm.append('ingredients', formData.ingredients);
    updatedForm.append('steps', formData.steps);
    if (imageFile) 
    {
      updatedForm.append('image', imageFile);
    }

    try 
    {
      await axios.put(`http://localhost:5002/api/recipt/${id}`, updatedForm, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Recipe updated successfully!");
      navigate('/');
    } 
    catch (error) {
      console.error("Error updating recipe:", error);
}
  };

  return (
    <div className="form-container">
    
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h1 align="center" style={{ fontSize: '30px' }}>Update Recipe </h1>
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={formData.ingredients}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="steps"
          placeholder="Steps (use newline for each step)"
          value={formData.steps}
          onChange={handleInputChange}
          required
        />
        {existingImage && (
          <div className="preview">
            <p>Current Image:</p>
            <img src={`http://localhost:5002/${existingImage}`} alt="Current" style={{ width: '200px' }} />
          </div>
        )}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}

export default Edit;
