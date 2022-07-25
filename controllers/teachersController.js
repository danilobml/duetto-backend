const express = require("express");
const teacherData = require("../data/mockDataTeachers.json");

const all_teachers = (req, res) => {
  res.send(teacherData);
};

module.exports = { all_teachers };
