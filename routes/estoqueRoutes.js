import express from 'express';



import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  excluirProduto,
  registrarMovimento,
  listarMovimentos
} from '../controllers/estoqueController.js'; // ✅ caminho e nome corrigidos

const router = express.Router();

// Produtos
router.get('/produtos', listarProdutos);
router.post('/produtos', criarProduto);
router.put('/produtos/:id', atualizarProduto);
router.delete('/produtos/:id', excluirProduto);

// Movimentações
router.get('/movimentos', listarMovimentos);
router.post('/movimentos', registrarMovimento);

export default router;
