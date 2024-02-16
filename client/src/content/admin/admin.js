import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const Admin = () => {
  const [imageURL, setImageURL] = useState('');
  const [position, setPosition] = useState(0);
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');
  const [storedTexts, setStoredTexts] = useState([]);

  useEffect(() => {
    const isAdmin = document.cookie.split(';').some((cookie) => cookie.trim().startsWith('admin='));

    if (!isAdmin) {
      window.location.href = '/unauthorized';
    } else {
      fetchImages();
      fetchTexts();
    }
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/images');
      setImages(response.data.images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const fetchTexts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/texts');
      setStoredTexts(response.data.texts);
    } catch (error) {
      console.error('Error fetching texts:', error);
    }
  };

  const handleURLChange = (event) => {
    setImageURL(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleUpload = async () => {
    try {
      await axios.post('http://localhost:5000/api/upload', { imageURL, position });
      fetchImages();
    } catch (error) {
      console.error('Error uploading image URL:', error);
    }
  };

  const handleTextUpload = async () => {
    try {
      await axios.post('http://localhost:5000/api/upload-text', { content: text });
      fetchTexts();
      setText('');
    } catch (error) {
      console.error('Error uploading text:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      fetchImages();
    } catch (error) {
      console.error('Error deleting image URL:', error);
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDrop = async (e, index) => {
    const draggedIndex = e.dataTransfer.getData('index');
    const newImages = [...images];
    const temp = newImages[draggedIndex];
    newImages[draggedIndex] = newImages[index];
    newImages[draggedIndex].position = parseInt(draggedIndex) + 1;
    newImages[index] = temp;
    newImages[index].position = parseInt(index) + 1;
    setImages(newImages);
  
    try {
      await axios.put('http://localhost:5000/api/update-positions', { images: newImages });
    } catch (error) {
      console.error('Error updating image positions:', error);
    }
  };

  return (
    <div className="admin-container">
      <div className="upload-section">
        <div className="upload-item">
          <h2>Image Upload</h2>
          <input
            type="text"
            value={imageURL}
            onChange={handleURLChange}
            className="upload-input"
            placeholder="Enter image URL"
          />
          <button onClick={handleUpload} className="upload-button">Upload</button>
        </div>
        <div className="upload-item">
          <h2>Text Upload</h2>
          <textarea
            value={text}
            onChange={handleTextChange}
            className="upload-textarea"
            placeholder="Enter text"
          />
          <button onClick={handleTextUpload} className="upload-button">Upload Text</button>
        </div>
      </div>

      <div className="image-grid">
        {images.map((image, index) => (
          <div
            key={image._id}
            className="image-item"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
          >
            <img src={image.imageURL} alt="Uploaded" className="uploaded-image" />
            <button onClick={() => handleDelete(image._id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>

      <div className="text-list">
        {storedTexts.map((storedText, index) => (
          <div key={index} className="text-item">
            <p>{storedText.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
