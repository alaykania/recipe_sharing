
import React, { useEffect, useState } from 'react';
import '../style/Homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [image, setImage] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    fetch("http://localhost:5002/api/home")
      .then(response => response.json())
      .then(data => setImage(data))
      .catch(error => console.error("Error fetching data:", error));
  };

 
const handleDelete = async (id) => {

    try {
      const res = await fetch(`http://localhost:5002/api/delete/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert("Recipe deleted successfully!");
        fetchRecipes(); // refresh list
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  
};
  

  const filteredImages = image.filter(recipe => {
    const nameMatch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const ingredientMatch = recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || ingredientMatch;
  });

  return (
    <div>
      <input
        type="search"
        placeholder="Search via Name or Ingredients"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="Container">
        {filteredImages.length === 0 ? (
          <p style={{ padding: '1rem', fontSize: '18px' }}>No matching recipes found.</p>
        ) : (
          filteredImages.map((images) => (
            <div key={images._id} className="Image">
              <img
                src={`http://localhost:5002/${images.imagePath}`}
                alt="Uploaded"
              />
              <div className="text-section">
                <h2>{images.name}</h2>
                <h3>🧂 Ingredients:</h3>
                <ul>
                  {images.ingredients.split(/[,|\n]/).map((ing, idx) => (
                    <li key={idx}>{ing.trim()}</li>
                  ))}
                </ul>

                <h3>👨‍🍳 Steps:</h3>
                <ol>
                  {images.steps.split(/[\n|.]/).filter(s => s.trim() !== "").map((step, idx) => (
                    <li key={idx}>{step.trim()}</li>
                  ))}
                </ol>

                <div className="action-buttons">
                <Link to={`/edit/${images._id}`} className="edit-btn">✏️ Edit</Link>
                <button className="delete-btn" onClick={() => handleDelete(images._id)}>🗑️ Delete</button>

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Homepage;

