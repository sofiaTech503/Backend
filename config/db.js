import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Detecta automaticamente se está em ambiente de produção (ex: Render) ou local
const isProduction = process.env.NODE_ENV === 'production';

// Configuração dinâmica
const sequelize = new Sequelize(
  process.env.DB_NAME || 'erp_sofiatech',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || '123456',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: isProduction
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {
          ssl: false,
        },
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados PostgreSQL estabelecida com sucesso.');

    await sequelize.sync({ alter: true });
    console.log('🧩 Tabelas sincronizadas com sucesso.');
  } catch (error) {
    console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', error);
  }
}

connectDB();

export default sequelize;
