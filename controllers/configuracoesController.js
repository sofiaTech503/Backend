import * as Config from "../models/configuracoesModel.js";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Config.getUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar usuários", err });
  }
};

export const criarUsuario = async (req, res) => {
  try {
    await Config.addUsuario(req.body);
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar usuário", err });
  }
};

export const listarParametros = async (req, res) => {
  try {
    const data = await Config.getParametros();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar parâmetros", err });
  }
};

export const listarLogs = async (req, res) => {
  try {
    const data = await Config.getLogs();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar logs", err });
  }
};
