import asyncHandler from "express-async-handler";

import Genre from "../models/genreModel.js";

//@desc Fetch all Genres
//@route GET /api/products
//@access public
const getGenres = asyncHandler(async (req, res) => {
  const pageSize = 9;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Genre.countDocuments({ ...keyword });
  const products = await Genre.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc Fetch a Genre
//@route GET /api/products/:id
//@access public
const getGenreById = asyncHandler(async (req, res) => {
  const product = await Genre.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Genre not found");
  }
});

//@desc Create a Genres
//@route POST /api/products
//@access Private/Admin
const createGenre = asyncHandler(async (req, res) => {
  const product = new Genre({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/attacks.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  // console.log(product.price);

  const createdGenre = await product.save();

  res.status(201).json(createdGenre);
});

//@desc update a genre
//@route PUT /api/products/:id
//@access private/admin
const updateGenre = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Genre.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedGenre = await product.save();
    res.json(updatedGenre);
  } else {
    res.status(404);
    throw new Error("Resource not found ");
  }
});

//@desc delete a genre
//@route DELETE /api/products/:id
//@access private/admin
const deleteGenre = asyncHandler(async (req, res) => {
  const product = await Genre.findById(req.params.id);

  if (product) {
    await product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product delete" });
  } else {
    res.status(404);
    throw new Error("Resource not found ");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createGenreReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Genre.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc get Top rated Genre
//@route GET /api/products/:id
//@access public
const getTopGenre = asyncHandler(async (req, res) => {
  const products = await Genre.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});

export {
  getGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
  createGenreReview,
  getTopGenre,
};
