const express = require('express');
const router = express.Router();
const Aname = require('../models/Aname');

router.post('/', async (req, res) => {
  try {
    const aname = new Aname(req.body);
    const savedAname = aname.save();
    res.json(savedAname);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to handle Fetch (hämta) all anames
router.get('/', async (req, res) => {
  try {
    const anames = await Aname.find();
    res.json(anames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to handle updating an existing aname
router.put('/:id', async (req, res) => {
  const anameId = req.params.id;
  const { steffoname, alosen, antal} = req.body;

  try {
    // Find the aname by ID
    const aname = await Aname.findById(anameId);

    if (!aname) {
      return res.status(404).json({ message: 'Aname not found' });
    }

    // Update aname properties
    aname.steffoname = steffoname;
    aname.alosen = alosen;
    aname.antal = antal;

    // Save the updated aname
    const updatedAname = await aname.save();
    res.json(updatedAname);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





module.exports = router;