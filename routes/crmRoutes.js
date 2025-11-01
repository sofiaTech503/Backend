// backend/routes/crmRoutes.js

import express from 'express';

// Importa as funções de controle que agora têm os nomes corretos
import { 
    criarCliente, 
    listarClientes, 
    buscarClientePorId, // Nome correto
    atualizarCliente, 
    deletarCliente      // Nome correto
} from '../controllers/crmController.js'; 


const router = express.Router();

// 1. Rota para criar um novo cliente
// POST /api/crm/clientes
router.post('/clientes', criarCliente);

// 2. Rota para listar todos os clientes
// GET /api/crm/clientes
router.get('/clientes', listarClientes);

// 3. Rota para buscar um cliente por ID
// GET /api/crm/clientes/:id
router.get('/clientes/:id', buscarClientePorId);

// 4. Rota para atualizar um cliente por ID
// PUT /api/crm/clientes/:id
router.put('/clientes/:id', atualizarCliente);

// 5. Rota para deletar um cliente por ID
// DELETE /api/crm/clientes/:id
router.delete('/clientes/:id', deletarCliente);

// Exporta o router como 'default' para que o server.js possa importá-lo facilmente
export default router;