// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection code for MongoDB Atlas
const mongoUri = "mongodb+srv://BOLLE:BOLLE@reactauthdemo.laovbfv.mongodb.net/?retryWrites=true&w=majority";


// MongoDB connection code for local MongoDB instance
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log("Error connecting to MongoDB:", err.message);
  })  
const User = mongoose.model('User', {
  username: String,
  password: String,
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const Image = mongoose.model('Image', {
  imageURL: String,
  position: Number, // New field
});

app.post('/api/upload', async (req, res) => {
  try {
    const { imageURL, position } = req.body;
    const image = new Image({ imageURL, position });
    await image.save();
    console.log('Image URL saved:', imageURL);
    res.status(200).json({ message: 'Image URL uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image URL:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Image.findByIdAndDelete(id);
    res.status(200).json({ message: 'Image URL deleted successfully' });
  } catch (error) {
    console.error('Error deleting image URL:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/images', async (req, res) => {
  try {
    const images = await Image.find().sort('position');
    res.status(200).json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.put('/api/update-positions', async (req, res) => {
  try {
    const { images } = req.body;
    for (const image of images) {
      await Image.findByIdAndUpdate(image._id, { position: image.position });
    }
    res.status(200).json({ message: 'Image positions updated successfully' });
  } catch (error) {
    console.error('Error updating image positions:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// Importer Text-modellen fra Mongoose
const Text = mongoose.model('Text', {
  content: String,
});

// Endre /api/upload-text-endepunktet for å laste opp teksten til MongoDB
app.post('/api/upload-text', async (req, res) => {
  try {
    const { content } = req.body;
    let text = await Text.findOne(); // Finn den eksisterende teksten
    if (!text) {
      // Hvis det ikke finnes noen eksisterende tekst, opprett en ny
      text = new Text({ content });
    } else {
      // Hvis det finnes eksisterende tekst, oppdater den
      text.content = content;
    }
    await text.save();
    res.status(200).json({ message: 'Text uploaded successfully' });
  } catch (error) {
    console.error('Error uploading text:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Legg til et nytt rute for å hente den lagrede teksten
app.get('/api/texts', async (req, res) => {
  try {
    const texts = await Text.find();
    res.status(200).json({ texts });
  } catch (error) {
    console.error('Error fetching texts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
