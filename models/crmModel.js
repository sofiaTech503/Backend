// backend/models/crmModel.js

import db from '../config/db.js';
import { DataTypes } from 'sequelize';

// Define o modelo Cliente. Certifique-se que 'db' é sua instância de conexão Sequelize!
const Cliente = db.define('Cliente', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nome: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING(100), 
    allowNull: false, 
    unique: true 
  },
  telefone: { 
    type: DataTypes.STRING(20) 
  },
  endereco: { 
    type: DataTypes.STRING(200) 
  },
  createdAt: { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
  updatedAt: { 
    type: DataTypes.DATE, 
    allowNull: true 
  }
}, {
  tableName: 'clientes',
  timestamps: true
});

// Exporta o modelo usando 'default' para ser importado no Controller
export default Cliente;