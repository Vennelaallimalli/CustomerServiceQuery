const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

router.post('/', async (req, res) => {
  const { userEmail, category, comment } = req.body;
  const request = new Request({ userEmail, category, comment });
  await request.save();
  res.json({ success: true });
});

router.get('/:category', async (req, res) => {
  const { category } = req.params;
  const requests = await Request.find({ category });
  res.json(requests);
});

module.exports = router;
