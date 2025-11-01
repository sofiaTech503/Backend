// backend/controllers/rhController.js

import * as RH from "../models/rhModel.js";

export const listarCargos = async (req, res) => {
  try {
    const data = await RH.getCargos();
    res.json(data);
  } catch (err) {
    // O erro será capturado do Model
    res.status(500).json({ message: "Erro ao listar cargos", error: err.message });
  }
};

export const listarColaboradores = async (req, res) => {
  try {
    const data = await RH.getColaboradores();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar colaboradores", error: err.message });
  }
};

export const listarFolha = async (req, res) => {
  try {
    const data = await RH.getFolha();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar folha de pagamento", error: err.message });
  }
};