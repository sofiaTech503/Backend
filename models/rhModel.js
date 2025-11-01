// backend/models/rhModel.js

// IMPORTANTE: Altere o caminho se o seu arquivo de conexão com o DB não for ../config/db.js
import db from "../config/db.js";

// Cargos
export const getCargos = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM cargos");
    return rows;
  } catch (error) {
    throw new Error("Falha ao consultar cargos no DB.");
  }
};

// Colaboradores
export const getColaboradores = async () => {
  try {
    const [rows] = await db.query(`
      SELECT c.id, c.nome, c.data_admissao, ca.nome AS cargo, ca.salario_base
      FROM colaboradores c
      LEFT JOIN cargos ca ON c.cargo_id = ca.id
    `);
    return rows;
  } catch (error) {
    throw new Error("Falha ao consultar colaboradores no DB.");
  }
};

// Folha de Pagamento
export const getFolha = async () => {
  try {
    const [rows] = await db.query(`
      SELECT f.id, co.nome AS colaborador, f.mes_referencia, f.salario, f.descontos, f.liquido
      FROM folha_pagamento f
      JOIN colaboradores co ON f.colaborador_id = co.id
    `);
    return rows;
  } catch (error) {
    throw new Error("Falha ao consultar folha de pagamento no DB.");
  }
};

// Este arquivo não precisa de 'export default', pois todas as funções são nomeadas.