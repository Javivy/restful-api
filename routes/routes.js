const express = require("express");

const router = express.Router();

const Model = require("../models/model");

// Post Method
router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const ID = req.params.id
    const dataFound = await Model.findById(ID);
    res.json(dataFound);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update by ID method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// Delete by ID method
router.delete("/delete/:id", async (req, res) => {
  try {
    const ID = req.params.id
    const deletedItem = await Model.findByIdAndDelete(ID)
    res.send(`Item with name ${deletedItem.name} was deleted successfully`)
  } catch (error) {
    
  }
});

module.exports = router;
