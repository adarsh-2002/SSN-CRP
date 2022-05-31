import { Router } from 'express';
const router = Router();
import { join } from 'path';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(join(__dirname, '..', 'views', 'index.html'));
});

export default router;