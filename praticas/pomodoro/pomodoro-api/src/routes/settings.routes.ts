import { Router } from 'express';
import { SettingsController } from '../controllers/SettingsController';

const router = Router();

router.get('/settings', SettingsController.get);
router.put('/settings', SettingsController.update);

export default router;
