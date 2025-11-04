import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Produto from "../models/estoqueModel.js"; // relação com produtos

const Movimento = db.define("Movimento", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM("entrada", "saida"),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  observacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_movimento: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Relacionamento com Produto
Movimento.belongsTo(Produto, { foreignKey: "produto_id" });

export default Movimento;
