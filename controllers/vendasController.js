// Supondo que o seu model se conecta ao DB e busca os dados
const vendasModel = require('../models/vendasModel'); 

exports.getVendasMensais = async (req, res) => {
  try {
    // 1. CHAMA O MODEL PARA INTERAGIR COM O BANCO DE DADOS
    const dadosVendas = await vendasModel.buscarVendasMensais(); 
    
    // 2. RETORNA OS DADOS FORMATADOS PARA O FRONTEND
    // O formato deve ser o que o seu gráfico espera (ex: {mes: 'Mai', valor: 9000})
    res.status(200).json(dadosVendas); 

  } catch (error) {
    console.error("Erro no Controller de Vendas Mensais:", error);
    // 3. TRATAMENTO DE ERRO
    res.status(500).json({ 
        message: "Erro interno do servidor ao buscar vendas.", 
        error: error.message 
    });
  }
};
