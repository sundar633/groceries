const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Load JSON file
const items = JSON.parse(fs.readFileSync("./items.json", "utf8"));

// Serve images folder
app.use("/groc", express.static(path.join(__dirname, "groc")));

// Get all items
app.get("/items", (req, res) => {
  res.json(items);
});

// Get item by ID
app.get("/items/:id", (req, res) => {
  const item = items.find(i => i.id == req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(item);
});

// Render uses PORT from environment variable
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
