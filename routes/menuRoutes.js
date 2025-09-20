const express = require("express");
const router = express.Router();
const {
  getMenuTypes,
  searchMenuType,
  getItemsByType,
  addCategory,
  getAllFoodItems
} = require("../controllers/menuController");

router.get("/menu-types", getMenuTypes);
router.get("/search", searchMenuType);
router.get("/items/:type", getItemsByType);
router.get("/food", getAllFoodItems);

router.post("/categories", addCategory);

module.exports = router;
