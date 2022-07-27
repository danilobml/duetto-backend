const Teacher = require("../models/Teachers");

const get_all_teachers = async (req, res) => {
  try {
    const getAllTeachers = await Teacher.find({});
    res.json(getAllTeachers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const create_new_teacher = async (req, res) => {
  const teacher = req.body;
  try {
    const createdTeacher = await Teacher.create(teacher);
    res.json(createdTeacher);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const partially_update_teacher = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;
  try {
    const { modifiedCount } = await Teacher.updateOne({ _id: id }, { [key]: value });
    if (!modifiedCount) return res.status(404).send("Teacher not found");
    res.send("The teacher was updated successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { get_all_teachers, create_new_teacher, partially_update_teacher };
