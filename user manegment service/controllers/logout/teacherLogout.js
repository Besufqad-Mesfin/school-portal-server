import teacherModel from "../../models/teacherModel";

export const teacherLogout = async (req, res) => {
  try {
    const teacherId = req.body;

    const teacher= await teacherModel.findOne({ where: { teacherId } });
    if (!teacherId) {
      return res
        .status(400)
        .json({ success: false, message: "Teacher  is not found" });
    }
    teacher.isloggedIn = false;
    await teacher.save();
    
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
