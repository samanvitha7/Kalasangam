const Artform=require("../models/ArtForm.js");

// DELETE /api/artforms/:id
export const deleteArtform = async (req, res) => {
  try {
    const deleted = await Artform.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Artform not found" });
    res.status(200).json({ message: "Artform deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting artform", error });
  }
};


