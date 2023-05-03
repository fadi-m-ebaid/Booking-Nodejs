const fs = require('fs');
var express = require('express');
const adminsModel = require('../models/Admins');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

function createAdmin(Admin) {
  return adminsModel.create(Admin);
}

function getAdmin() {
  return adminsModel.find();
}

function deleteAdmin(id) {
  return adminsModel.findByIdAndDelete(id);
}

function updateAdmin(id, Admin) {
  return adminsModel.findByIdAndUpdate(id, Admin);
}

function getAdminById(id) {
  return adminsModel.findById(id);
}

async function login(req, res) {
  var { adminEmail, adminPassword } = req.body;
  var admin = await adminsModel.findOne({ adminEmail });

  if (admin) {
    var validPassword = bcrypt.compareSync(adminPassword, admin.adminPassword);

    if (validPassword) {
      var token = jwt.sign(
        {
          adminId: admin._id,
          adminName: admin.adminName,
          //roleId: admin.roleId
        },
        process.env.SECRET,
        { expiresIn: '4h' }
      );
      res.status(200).json({admin,token} );
    } else {
      res.status(401).json({ message: 'Invalid Email or Password' });
    }
  } else {
    res.status(401).end('Email Not Found');
  }
}

module.exports = {
  login,
  createAdmin,
  getAdmin,
  deleteAdmin,
  updateAdmin,
  getAdminById,
};
