import Venda from "../models/vendasModel.js";
import connection from "../config/db.js";

// Criar nova venda
export const criarVenda = async (req, res) => {
  try {
    const novaVenda = await Venda.create(req.body);
    res.status(201).json(novaVenda);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar venda", error });
  }
};

// Listar todas as vendas
export const listarVendas = async (_req, res) => {
  try {
    const vendas = await Venda.findAll();
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar vendas", error });
  }
};

// Buscar venda específica
export const buscarVenda = async (req, res) => {
  try {
    const venda = await Venda.findByPk(req.params.id);
    if (!venda) return res.status(404).json({ message: "Venda não encontrada" });
    res.json(venda);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar venda", error });
  }
};

// Atualizar venda
export const atualizarVenda = async (req, res) => {
  try {
    const venda = await Venda.findByPk(req.params.id);
    if (!venda) return res.status(404).json({ message: "Venda não encontrada" });

    await venda.update(req.body);
    res.json({ message: "Venda atualizada com sucesso", venda });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar venda", error });
  }
};

// Excluir venda
export const excluirVenda = async (req, res) => {
  try {
    const venda = await Venda.findByPk(req.params.id);
    if (!venda) return res.status(404).json({ message: "Venda não encontrada" });

    await venda.destroy();
    res.json({ message: "Venda excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir venda", error });
  }
};
