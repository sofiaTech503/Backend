// backend/models/financeiroModel.js

import { DataTypes, Sequelize, literal } from 'sequelize';
// Altere o caminho se o seu arquivo db.js não estiver em ../config/
import sequelize from '../config/db.js'; 

// Definição do Modelo Financeiro
const Financeiro = sequelize.define('Financeiro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
  // Deve conter 'RECEITA' ou 'DESPESA'
  tipo: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  data: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'financeiro', 
  timestamps: false, 
});


// Funções de Lógica de Negócios (para uso no Controller)

// Busca Contas a Receber (onde tipo é RECEITA)
export const getContasReceber = async () => {
    return await Financeiro.findAll({
        where: { tipo: 'RECEITA' },
        order: [['data', 'ASC']]
    });
};

// Busca Contas a Pagar (onde tipo é DESPESA)
export const getContasPagar = async () => {
    return await Financeiro.findAll({
        where: { tipo: 'DESPESA' },
        order: [['data', 'ASC']]
    });
};

// Busca os últimos lançamentos para o Fluxo (tabela do front-end)
export const getFluxoCaixa = async () => {
    return await Financeiro.findAll({
        limit: 10,
        order: [['data', 'DESC']]
    });
};

// Calcula os totais agregados para o Dashboard (Rota Resumo /)
export const getResumoFinanceiro = async () => {
    // Calcula o total de receitas e despesas
    const totais = await Financeiro.findAll({
        attributes: [
            [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN tipo = "RECEITA" THEN valor ELSE 0 END')), 'totalReceber'],
            [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN tipo = "DESPESA" THEN valor ELSE 0 END')), 'totalPagar'],
            // Se você tiver uma coluna "caixa" ou "banco", o saldo seria o valor dela. 
            // Aqui, calculamos o saldo como Receber - Pagar
        ],
        raw: true
    });

    const total = totais[0];
    const saldoCaixa = (parseFloat(total.totalReceber || 0) - parseFloat(total.totalPagar || 0)).toFixed(2);
    
    return {
        saldo: parseFloat(saldoCaixa),
        receber: parseFloat(total.totalReceber || 0),
        pagar: parseFloat(total.totalPagar || 0)
    };
};

export default Financeiro;