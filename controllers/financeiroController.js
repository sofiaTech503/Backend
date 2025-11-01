// backend/controllers/financeiroController.js

import * as Fin from "../models/financeiroModel.js";

// Obtém o Resumo para os cartões do Dashboard (rota /api/financeiro)
export const getResumo = async (req, res) => {
    try {
        const resumo = await Fin.getResumoFinanceiro();
        // O front-end espera { saldo: X, receber: Y, pagar: Z }
        res.json(resumo); 
    } catch (err) {
        console.error("Erro ao buscar resumo financeiro:", err);
        // Garante que o erro retorne status 500
        res.status(500).json({ message: "Erro ao buscar resumo financeiro", err });
    }
};

// Listar Contas a Receber
export const listarContasReceber = async (req, res) => {
    try {
        const data = await Fin.getContasReceber();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar contas a receber", err });
    }
};

// Listar Contas a Pagar
export const listarContasPagar = async (req, res) => {
    try {
        const data = await Fin.getContasPagar();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar contas a pagar", err });
    }
};

// Listar Fluxo de Caixa (para a tabela detalhada)
export const listarFluxo = async (req, res) => {
    try {
        const data = await Fin.getFluxoCaixa();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar fluxo de caixa", err });
    }
};