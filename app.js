const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

let date = new Date().toJSON();
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + date + path.extname(file.originalname));
  }
  
});

// Initialize upload middleware
const upload = multer({
  storage: storage
}).single('image');

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));


// Route for handling image upload
app.post('/employee', (req, res) => {
  // Handle file upload
  upload(req, res, (err) => {
    if (err) {
      // Handle upload error
      console.error(err);
      res.status(500).send({ error: 'An error occurred while uploading the image.' });
    } else {
      // Image uploaded successfully, send success response
      // res.status(200).send({ message: 'Image uploaded successfully.' });
      res.redirect('http://localhost:3000/employee/create');
    }
  });
});
// Start the server
app.listen(4000, () => {
  console.log('Server started on http://localhost:4000');
});