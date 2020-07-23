const {Router} = require('express');
const router = Router();

const Hero = require('../models/Hero.model');


// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })


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
    const {
      nickname, real_name, origin_description,
      superpowers, catch_phrase
    } = req.body;
    const images = req.files.map(el=>el.filename)

    const hero = new Hero({
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images
    });

    await hero.save();
    res.json({message: 'Superhero was added'});

  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Server error'});
  }
});

router.put('/:id', async (req, res) => {
  try {


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
