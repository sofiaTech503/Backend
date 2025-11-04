import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Certifique-se de que o caminho está correto

// Modelo de Produto
const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // Informações básicas
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },

  // SKU - código único do produto
  sku: {
    type: DataTypes.STRING(50),
    allowNull: true, // ✅ Corrigido: permite nulo para evitar erro de migração
    unique: false,   // ✅ Temporariamente sem UNIQUE até normalizar os dados
  },

  descricao: {
    type: DataTypes.TEXT,
  },

  // Informações de preço
  precoCusto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  precoVenda: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },

  // Controle de estoque
  quantidadeEmEstoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  unidadeDeMedida: {
    type: DataTypes.STRING(10),
    defaultValue: 'UN',
  },

  // Controle de criação e atualização
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  }

}, {
  tableName: 'produtos',
  timestamps: false, // ⚙️ Mantém o controle manual dos timestamps acima
});

export default Produto;
