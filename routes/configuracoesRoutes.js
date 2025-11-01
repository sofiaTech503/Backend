import express from "express";
import { listarUsuarios, criarUsuario, listarParametros, listarLogs } from "../controllers/configuracoesController.js";
import db from "../config/db.js";

const router = express.Router();

router.get("/usuarios", listarUsuarios);
router.post("/usuarios", criarUsuario);
router.get("/parametros", listarParametros);
router.get("/logs", listarLogs);

export default router;
