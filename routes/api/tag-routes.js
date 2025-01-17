const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err, "An error occurred when finding all tags.");
    res.status(500).json(err);
  });

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: "Unable to locate a tag with specified id." });
      return;
    } else {
      res.json(tagData);
    }
  })
  .catch(err => {
    console.log(err, "Unable to find specified tag.");
    res.status(500).json(err);
  });
});


router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tagData => {
    console.log('New tag successfully created.');
    res.json(tagData);
  })
  .catch(err => {
    console.log(err, 'Unable to create new tag.');
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: "Unable to find tag with specified id."});
      return;
    } else {
      res.json(tagData)
    }
  })
  .catch(err => {
    console.log(err, "Unable to update tag.");
    res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: "Unable to locate tag with specified id."});
      return;
    } else {
      res.json(tagData)
    }
  })
  .catch(err => {
    console.log(err, 'Unable to delete specified tag.');
    res.status(500).json(err);
});
});

module.exports = router;

