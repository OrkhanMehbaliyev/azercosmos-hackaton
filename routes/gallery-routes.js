const router = require("express").Router();
const galleryController = require("../controllers/galleryController");

router.post("", galleryController.uploadPhotoToGallery);
router.get("/all", galleryController.getAllPhotosFromGallery);
router.get("/:id", galleryController.photosGetByIdFromGallery);

module.exports = router;
