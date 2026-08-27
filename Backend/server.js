const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api', chatRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});