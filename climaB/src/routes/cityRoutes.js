const express = require('express');
const router = express.Router();
const City = require('../models/city');

// Guardar una ciudad
router.post('/city', async (req, res) => {
  const { city, country, temperature, conditionText, icon } = req.body;
  const newCity = new City({
    city, country, temperature, conditionText, icon
  });

  try {
    await newCity.save();
    console.log('Data saved:', newCity);
    res.status(201).send('Data Saved')
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

//export default router;
// Obtener todas las ciudades
/*router.get('/city', async (req, res) => {
  try {
    const cities = await City.find().sort({ date: -1 });
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});*/

module.exports = router;
