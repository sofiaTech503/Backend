// backend/routes/rhRoutes.js (Atualizado)

import express from "express";
import { listarCargos, listarColaboradores, listarFolha } from "../controllers/rhController.js";

const router = express.Router();

// 💡 CORREÇÃO: Adiciona a rota raiz que a dashboard está chamando.
// Faz com que /api/rh retorne a lista de colaboradores.
router.get("/", listarColaboradores); // Chama o controller para listar todos os colaboradores

router.get("/cargos", listarCargos);
router.get("/colaboradores", listarColaboradores);
router.get("/folha", listarFolha);

export default router;