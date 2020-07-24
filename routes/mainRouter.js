const {Router} = require('express');
const config = require('config');
const Hero = require('../models/Hero.model');
const deleteImage = require('../deleteHelper');

const router = Router();

router.get('/:page', async (req, res) => {
  try {
    const {page} = req.params;
    const limit = config.get('pageLimit');
    const heroList = await Hero.find().limit(limit).skip((page - 1) * limit);
    const pages = Math.ceil(await Hero.countDocuments() / limit);
    res.json({heroList, pages});
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Server error'});
  }
});


router.get('/hero/:id', async (req, res) => {
  try {
    const hero = await Hero.findOne({_id: req.params.id});
    res.json(hero);
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
    const isDuplicate = e.message.includes('duplicate');
    res.status(500).json({
      message: isDuplicate ? `Hero ${req.body.nickname} exists` : 'Server error'
    });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const images = req.files.map(el => el.filename);
    const imageUrl = JSON.parse(req.body.imageNames)

    const response = await Hero.findOneAndUpdate({_id: req.params.id},
      {...req.body, images: [...imageUrl, ...images]});

    const imageToDelete = response.images.filter(img=>!imageUrl.includes(img))
    deleteImage(imageToDelete);

    res.json({message: 'Superhero was updated'});
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Server error'});
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const response = await Hero.findOneAndDelete({_id: req.params.id});

    deleteImage(response.images);

    res.json({message: 'hero deleted'});
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'Server error'});
  }
});

module.exports = router;
