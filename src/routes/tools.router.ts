import express from 'express';
const router = express.Router();

import {
  getTools,
  createTool,
  deleteTool,
} from '../controllers/tools.controller';

router.route('/tools').get(getTools).post(createTool);

router.route('/tools/:id').delete(deleteTool);

export default router;
