// admin.js
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
    fetchImages();
    fetchTexts(); // Fetch stored text on component mount
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
      fetchImages(); // Refresh images after upload
    } catch (error) {
      console.error('Error uploading image URL:', error);
    }
  };

  const handleTextUpload = async () => {
    try {
      await axios.post('http://localhost:5000/api/upload-text', { content: text });
      fetchTexts(); // Refresh texts after upload
      setText(''); // Clear the textarea after upload
    } catch (error) {
      console.error('Error uploading text:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      fetchImages(); // Refresh images after deletion
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
    newImages[draggedIndex].position = parseInt(draggedIndex) + 1; // Update dragged image position
    newImages[index] = temp;
    newImages[index].position = parseInt(index) + 1; // Update dropped image position
    setImages(newImages);
  
    try {
      // Update positions in the database
      await axios.put('http://localhost:5000/api/update-positions', { images: newImages });
    } catch (error) {
      console.error('Error updating image positions:', error);
    }
  };

  return (
    <div className="container1">
      <h1 className="title1">Image Upload</h1>
      <input
        type="text"
        value={imageURL}
        onChange={handleURLChange}
        placeholder="Enter image URL"
        className="input1"
      />
      <button onClick={handleUpload} className="upload-button1">
        Upload
      </button>

      <div className="image-grid1">
        {images.map((image, index) => (
          <div
            key={image._id}
            className="image-item1"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
          >
            <img src={image.imageURL} alt="Uploaded" className="uploaded-image1" />
            <button onClick={() => handleDelete(image._id)} className="delete-button1">
              Delete
            </button>
          </div>
        ))}
      </div>

      <h1 className="title1">Text Upload</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text"
        className="textarea1"
      />
      <button onClick={handleTextUpload} className="upload-button1">
        Upload Text
      </button>

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
