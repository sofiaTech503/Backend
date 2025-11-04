import express from "express";


import {
  criarVenda,
  listarVendas,
  buscarVenda,
  atualizarVenda,
  excluirVenda,
} from "../controllers/vendasController.js";

const router = express.Router();

router.post("/", criarVenda);
router.get("/", listarVendas);
router.get("/:id", buscarVenda);
router.put("/:id", atualizarVenda);
router.delete("/:id", excluirVenda);

router.get("/", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM vendas");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar vendas:", err);
    res.status(500).json({ error: "Erro ao buscar vendas" });
  }
});

export default router;
