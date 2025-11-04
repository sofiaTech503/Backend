import db from "../config/db.js";
import { DataTypes } from "sequelize";
import Cliente from "../models/crmModel.js"; // integração com módulo CRM

const Venda = db.define("Venda", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_venda: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("orcamento", "finalizado", "cancelado"),
    defaultValue: "orcamento",
  },
});

// Relacionamento entre Venda e Cliente
Venda.belongsTo(Cliente, { foreignKey: "cliente_id" });

export default Venda;
