// backend/config/db.js

import { Sequelize } from 'sequelize';
import mysql from "mysql2";

// Configurações do seu banco de dados MySQL
const DB_NAME = 'SofiaTech';    // Seu nome de banco de dados
const DB_USER = 'root';         // Seu usuário
const DB_PASS = '123456';       // Sua senha (123456)
const DB_HOST = 'localhost';    // Seu host
const DB_DIALECT = 'mysql';

// Cria a instância do Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false, // Opcional: desliga os logs do Sequelize no console
    // Garanta que a porta é 3306 se for diferente do padrão (embora geralmente não seja necessário definir)
    // port: 3306, 
});

// Função para tentar a conexão
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
        
        // A chave é usar { alter: true } aqui:
        await sequelize.sync({ alter: true }); // <--- MUDANÇA AQUI!
        console.log('Tabelas sincronizadas.');

    } catch (error) {
        // Mantenha o log de erro para diagnóstico, mas use 'sequelize' para a instância
        console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', error.message);
        // O erro original deve ser capturado pelo Sequelize, se você tiver um log mais detalhado
    }
}

connectDB();

export default sequelize;