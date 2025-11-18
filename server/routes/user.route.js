const express = require("express");
const router = express.Router();
const { User } = require("../models");

// GET USERS
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// CREATE USER
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await User.update(req.body, { where: { id } });

  const updated = await User.findByPk(id);
  res.json(updated);
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.json({ message: "User deleted" });
});

module.exports = router;
