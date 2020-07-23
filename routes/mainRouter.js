const {Router} = require('express');
const Hero = require('../models/Hero.model');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const heroList = await Hero.find().limit(1);
    res.send(heroList);
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Server error'});
  }
});


router.post('/add', async (req, res) => {
  try {
    const images = req.files.map(el => el.filename);

    const hero = new Hero({...req.body, images});
    await hero.save();

    res.json({message: 'Superhero was added'});

  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Server error'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const images = req.files.map(el => el.filename);

    await Hero.findOneAndUpdate({_id: req.params.id},
      {...req.body, images: [...JSON.parse(req.body.imageNames), ...images]});

    res.json({message: 'Superhero was updated'});

  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Server error'});
  }
});

router.delete('/:id', async (req, res) => {
  try {

  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Server error'});
  }
});

module.exports = router;
