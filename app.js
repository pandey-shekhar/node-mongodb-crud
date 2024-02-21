const express = require("express");
const app = express();
const connectDB = require('./db');
const blogRoutes = require('./routes/blogRoutes');
const errorHandler = require('./middleware/errorHandler');

connectDB();

app.use(express.json());

app.use('/api/blogs', blogRoutes);

app.use(errorHandler);
  
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
