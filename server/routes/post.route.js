const express = require("express");
const router = express.Router();
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    include: [{ model: User, as: "user" }]
  });
  res.json(posts);
});

// CREATE
router.post("/", async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Post.update(req.body, { where: { id } });

  const updated = await Post.findByPk(id, {
    include: [{ model: User, as: "user" }]
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Post.destroy({ where: { id } });
  res.json({ message: "Post deleted" });
});

module.exports = router;
