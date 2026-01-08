import { Router } from 'express';
import { handleLogin, handleLogout, handleRefreshToken, handleGetProfile, requireAuth } from './local.controller';

const router = Router();

router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.post("/refresh", handleRefreshToken);
router.get("/me", requireAuth, handleGetProfile)

export default router;