const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const ProductModel = require("../model/Product");

router.get("/", async (req, res) => {
  const { limit, offset, name, brand } = req.query;
  let whereQuery = {};
  if (brand) whereQuery = { ...whereQuery, brand };
  if (name) whereQuery = { ...whereQuery, name };
  try {
    const resultCount = await ProductModel.findAndCountAll({
      attributes: {exclude: ['createdAt', 'updatedAt', 'description']},
      where: whereQuery,
      limit: limit,
      offset: offset
    });
    res.json(resultCount);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, brand, price, category,imageUrl } = req.body;
    const response = await ProductModel.create({
      name, description, brand, price, category, imageUrl
    });
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get(
  "/:id",
  [
    check("id")
      .isUUID([4])
      .withMessage("Invalid ID")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const Product = await ProductModel.findByPk(req.params.id);
      if (Product) res.json(Product);
      else res.json({});
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const deleteProduct = await ProductModel.destroy({
      where: { id: req.params.id }
    });
    deleteProduct > 0 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
