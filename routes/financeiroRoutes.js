// backend/routes/financeiroRoutes.js

import express from "express";
import { 
    listarContasReceber, 
    listarContasPagar, 
    listarFluxo,
    getResumo // 💡 NOVO: Importa a função de resumo
} from "../controllers/financeiroController.js";


const router = express.Router();

// 💡 CORREÇÃO: Trata a rota raiz /api/financeiro/ que o front-end chama primeiro
router.get("/", getResumo); 

router.get("/receber", listarContasReceber);
router.get("/pagar", listarContasPagar);
router.get("/fluxo", listarFluxo);

export default router;