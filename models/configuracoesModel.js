import db from "../config/db.js";
import bcrypt from "bcryptjs";


// Usuários
export const getUsuarios = async () => {
  const [rows] = await db.query("SELECT id, nome, email, role, ativo FROM usuarios");
  return rows;
};

export const addUsuario = async ({ nome, email, senha, role }) => {
  const senhaHash = await bcrypt.hash(senha, 10);
  await db.query(
    "INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)",
    [nome, email, senhaHash, role]
  );
};

// Parâmetros
export const getParametros = async () => {
  const [rows] = await db.query("SELECT * FROM parametros_sistema");
  return rows;
};

export const setParametro = async (nome, valor) => {
  await db.query("INSERT INTO parametros_sistema (nome, valor) VALUES (?, ?)", [nome, valor]);
};

// Logs
export const addLog = async (usuario_id, acao) => {
  await db.query("INSERT INTO logs_sistema (usuario_id, acao) VALUES (?, ?)", [usuario_id, acao]);
};

export const getLogs = async () => {
  const [rows] = await db.query(`
    SELECT l.id, u.nome AS usuario, l.acao, l.data_registro
    FROM logs_sistema l
    LEFT JOIN usuarios u ON l.usuario_id = u.id
    ORDER BY l.data_registro DESC
  `);
  return rows;
};
