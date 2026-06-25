import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();

router.post('/tasks', TaskController.create);
router.get('/tasks', TaskController.list);
router.patch('/tasks/:taskId/complete', TaskController.complete);
router.patch('/tasks/:taskId/interrupt', TaskController.interrupt);
router.delete('/tasks', TaskController.clear);

export default router;