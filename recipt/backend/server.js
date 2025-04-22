const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const Form = require('./model/recipt_schema');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage
({
    destination: function (req, file, cb) 
    {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) 
    {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


mongoose.connect("mongodb://localhost:27017/recipt", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => 
    {
    console.log("MongoDB connected successfully");
    })
.catch((err) =>
 {
    console.error("MongoDB connection error:", err);
});


app.post('/api/recipt', upload.single("image"), async (req, res) => {
    try {
        const { ingredients, steps,name } = req.body;
        const imagePath = req.file.path;

        const newForm = new Form({
            ingredients,
            steps,
            name,
            imagePath
        });

        await newForm.save();
        res.status(200).send("Registered Successfully");
    } catch (error) {
        console.error("Error saving form:", error);
        res.status(400).send("Failed to register");
    }
});

app.get('/api/recipt/:id', async (req, res) => {
    try {
      const recipe = await Form.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.delete('/api/delete/:id', async (req, res) => {
    try {
      const recipe = await Form.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
   
      if (recipe.imagePath && fs.existsSync(recipe.imagePath)) {
        fs.unlinkSync(recipe.imagePath);
      }
  
      await recipe.deleteOne();
      res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
app.get('/api/home',async(req,res)=>{
    try
    {
    const home=await Form.find();
    res.json(home);

    }
    catch(error)
    {
        res.send(error);

    }


});

app.put('/api/recipt/:id', upload.single('image'), async (req, res) => {
    try {
      const { name, ingredients, steps } = req.body;
  
      const updatedData = {
        name,
        ingredients,
        steps
      };
  
      if (req.file) {
        updatedData.imagePath = req.file.path;
      }
  
      const updatedRecipe = await Form.findByIdAndUpdate(req.params.id, updatedData, {
        new: true
      });
  
      if (!updatedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      res.status(200).json(updatedRecipe);
    } catch (error) {
      console.error('Error updating recipe:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });



app.listen(5002, () => {
    console.log("Server running on port 5002");
});
