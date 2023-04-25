const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const AdminsModel = require('../models/Admins');
var {
  login,
  createAdmin,
  getAdmin,
  deleteAdmin,
  updateAdmin,
  getAdminById,
} = require('../controllers/admins');

router.post('/', async (req, res, next) => {
  //done
  var Admin = req.body;
  try {
    var savedAdmin = await createAdmin(Admin);
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

router.get('/', async (req, res, next) => {
  //done

  try {
    var savedAdmin = await getAdmin();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

router.get('/:id', async (req, res, next) => {
  //done

  try {
    var { id } = req.params;
    var savedAdmin = await getAdminById(id);
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  //done
  try {
    var { id } = req.params;

    var deleted = await deleteAdmin(id);
    res.json(deleted);
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.patch('/:id', async (req, res) => {
  //update field by patch/done
  try {
    var { id } = req.params;
    var Admin = req.body;
    var updatedAdmin = await updateAdmin(id, Admin);
    res.json(updatedAdmin);
    
    var password = req.body.adminPassword
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return AdminsModel.findByIdAndUpdate(id,{adminPassword:hashedPassword})

  } catch (err) {
    res.json({ message: err.message });
  }
});


router.post('/login', login);

// export default router;
module.exports = router;
