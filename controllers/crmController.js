// backend/controllers/crmController.js

import Cliente from '../models/crmModel.js'; // Importa o modelo do arquivo correto
import connection from "../config/db.js";

// Criar cliente
export async function criarCliente(req, res) {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Listar clientes
export async function listarClientes(req, res) {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes: ' + error.message });
  }
}

// Buscar cliente por ID (Nome ajustado para corresponder à rota)
export async function buscarClientePorId(req, res) {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cliente: ' + error.message });
  }
}

// Atualizar cliente
export async function atualizarCliente(req, res) {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
    await cliente.update(req.body);
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Excluir cliente (Nome ajustado para corresponder à rota)
export async function deletarCliente(req, res) {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
    await cliente.destroy();
    res.json({ message: 'Cliente removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir cliente: ' + error.message });
  }
}