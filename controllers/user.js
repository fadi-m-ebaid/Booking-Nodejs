const fs = require('fs');
var express = require('express')
const usersModel = require('../models/users')
const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const { log } = require('console');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

function createUser(User) {
    return usersModel.create(User)
}

function getUser(id) {
    return usersModel.find(id);
}


function deleteUser(id) {
    return usersModel.findByIdAndDelete(id);
}

function updateUser(id, User) {
    return usersModel.findByIdAndUpdate(id, User);
}


function getUserById(id) {
    return usersModel.findById(id);
}

function searchUserByEmail(email) {
    return usersModel.find({ 'userEmail': email })
}

async function login(req, res) {
    var { userEmail, userPassword } = req.body;
    var user = await usersModel.findOne({ userEmail });


    if (user) {
        var validPassword = bcrypt.compareSync(userPassword, user.userPassword);

        if (validPassword) {
            var token = jwt.sign({
                userId: user._id,
                userName: user.userName,
                //roleId: user.roleId
            }, process.env.SECRET, { expiresIn: '4h' });
            res.status(200).json(token);

        }
        else {
            res.status(401).json({ message: 'Invalid Email or Password' })
        }
    }
    else {
        res.status(401).end('Email Not Found');
    }
}

module.exports = { login, createUser, getUser, deleteUser, updateUser, getUserById, searchUserByEmail }
