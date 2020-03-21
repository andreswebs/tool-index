const express = require('express');
const router = express.Router();

const controller = require('../controllers/tools.controller');

router.route('/tools')
  .get(controller.getTools)
  .post(controller.createTool);

router.route('/tools/:id')
  .delete(controller.deleteTool);

module.exports = router;
