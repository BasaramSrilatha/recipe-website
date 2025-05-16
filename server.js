const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://srilathabasaram:tvPSrmjn6NcheYzC@recipe-sharing.kbqh2yj.mongodb.net/')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ error: 'User already exists' });

  const newUser = new User({ username, password }); // hash password in production!
  await newUser.save();
  res.status(201).json({ message: 'User registered' });
});

// Mongoose Schema
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], default: [] },
  instructions: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.post('/api/recipes', async (req, res) => {
  try {
    console.log('📥 Received POST body:', req.body);

    const { title, description, ingredients, instructions, imageUrl } = req.body;

    // Optional: Log each field to be safe
    console.log('→ title:', title);
    console.log('→ description:', description);
    console.log('→ ingredients:', ingredients);
    console.log('→ instructions:', instructions);
    console.log('→ imageUrl:', imageUrl);

    // Basic validation check
    if (!title || !description || !instructions) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const recipe = new Recipe({
      title,
      description,
      ingredients: Array.isArray(ingredients) ? ingredients : [],
      instructions,
      imageUrl: imageUrl || ''
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error('❌ Error in POST /api/recipes:', error.message);
    res.status(500).json({ error: error.message });
  }
});



// GET /api/recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching recipes' });
  }
});

// DELETE /api/recipes/:id
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the recipe first
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Optional: Delete image file if stored locally
    if (recipe.imageUrl && !recipe.imageUrl.startsWith('http')) {
      const filePath = path.join(__dirname, recipe.imageUrl);
      fs.unlink(filePath, err => {
        if (err) console.warn('Failed to delete image file:', err);
      });
    }

    await Recipe.findByIdAndDelete(id);
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Error deleting recipe' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
