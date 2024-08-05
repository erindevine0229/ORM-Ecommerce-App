const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err, "An error occurrec when trying to display all categories.")
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'Unable to locate category with specified id.' })
      return;
    } else {
      res.json(categoryData)
    };
  })
  .catch(err => {
    console.log(err, "An error occurred when trying to find selected category.");
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err, "An error occurrec when trying to add new category.");
    res.status(500).json(err);
  });

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData[0]) {
      res.status(404).json({ message: "Unable to locate category with specified id." });
      return;
    } else {
      res.json(categoryData);
      console.log('Successfully updated category!')
    }
  })
  .catch(err => {
    console.log(err, "Unable to update category.");
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'Unable to locate category with specified id.'});
      return;
    } else {
      res.json(categoryData);
    }
  })
  .catch(err => {
    console.log(err, "Unable to delete selected category.");
    res.status(500).json(err);
  });
});

module.exports = router;
