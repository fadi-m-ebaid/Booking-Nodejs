const express = require('express');
const router = express.Router();

const ActivityModel = require('../models/Activities');
var{createActivity,getActivity,getActivityById,deleteActivity,updateActivity}  = require('../controllers/activities');

router.post('/', async (req, res, next) => {
  //done
  var Activity = req.body;
  try {
    var savedActivity = await createActivity(Activity);
    res.status(201).json(savedActivity);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

router.get('/', async (req, res, next) => {
  //done

  try {
    var savedActivity = await getActivity();
    res.status(201).json(savedActivity);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

router.get('/:id', async (req, res, next) => {
  //done

  try {
    var { id } = req.params;
    var savedActivity = await getActivityById(id);
    res.status(201).json(savedActivity);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  //done
  try {
    var { id } = req.params;

    var deleted = await deleteActivity(id);
    res.json(deleted);
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.patch('/:id', async (req, res) => {
  //update field by patch/done
  try {
    var { id } = req.params;
    var Activity = req.body;
    var updatedActivity = await updateActivity(id, Activity);
    res.json(updatedActivity);
  } catch (err) {
    res.json({ message: err.message });
  }
});



// export default router;
module.exports = router;
