// backend/controllers/estoqueController.js

import Produto from '../models/estoqueModel.js';
// Se você for usar o Movimento, ele precisa ser importado também. 
// Vamos assumir que você tem um modelo chamado Movimento.
import Movimento from '../models/movimentoModel.js'; 
import connection from "../config/db.js";

// --- FUNÇÕES DE PRODUTO ---

// Listar todos os produtos
export async function listarProdutos(req, res) {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar produtos: ' + error.message });
    }
}

// Criar novo produto
export async function criarProduto(req, res) {
    try {
        const novoProduto = await Produto.create(req.body);
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar produto: ' + error.message });
    }
}

// Atualizar produto
export async function atualizarProduto(req, res) {
    try {
        const [updated] = await Produto.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const produtoAtualizado = await Produto.findByPk(req.params.id);
            return res.json(produtoAtualizado);
        }
        throw new Error('Produto não encontrado');
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Excluir produto
export async function excluirProduto(req, res) {
    try {
        const deleted = await Produto.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.json({ message: 'Produto excluído com sucesso' });
        }
        throw new Error('Produto não encontrado');
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}


// --- FUNÇÕES DE MOVIMENTAÇÃO (Esqueleto) ---

// Registrar nova entrada/saída de estoque
export async function registrarMovimento(req, res) {
    // Lógica complexa de movimento: (1) salvar o movimento, (2) atualizar a quantidadeEmEstoque do Produto
    try {
        const { produtoId, tipo, quantidade, observacao } = req.body;
        
        // 1. Criar o registro de movimento
        const novoMovimento = await Movimento.create({
            produtoId, 
            tipo, // Ex: 'ENTRADA' ou 'SAIDA'
            quantidade, 
            observacao
        });

        // 2. Atualizar o estoque do produto
        const produto = await Produto.findByPk(produtoId);
        if (!produto) throw new Error('Produto para movimentação não encontrado.');
        
        let novaQuantidade = produto.quantidadeEmEstoque;
        if (tipo === 'ENTRADA') {
            novaQuantidade += quantidade;
        } else if (tipo === 'SAIDA') {
            if (produto.quantidadeEmEstoque < quantidade) throw new Error('Estoque insuficiente para a saída.');
            novaQuantidade -= quantidade;
        }

        await produto.update({ quantidadeEmEstoque: novaQuantidade });

        res.status(201).json({ movimento: novoMovimento, produto: produto });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao registrar movimento: ' + error.message });
    }
}

// Listar todos os movimentos
export async function listarMovimentos(req, res) {
    try {
        // Inclui o Produto para saber a qual item o movimento se refere
        const movimentos = await Movimento.findAll({ include: [Produto] }); 
        res.json(movimentos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar movimentos: ' + error.message });
    }
}