// IMPORTAÇÕES ESSENCIAIS
const express = require('express');
const cors = require('cors');
// Supondo que você use body-parser ou o express nativo para JSON
const bodyParser = require('body-parser'); 
const app = express();
const port = process.env.PORT || 3000;

// Importação das rotas (Exemplo baseado na sua estrutura 'routes')
const vendasRoutes = require('./routes/vendasRoutes');
// ... importe outras rotas (crmRoutes, estoqueRoutes, etc.)

// =======================================================
// 1. CONFIGURAÇÃO DE MIDDLEWARES GLOBAIS (INCLUINDO CORS)
// =======================================================

// A URL EXATA do seu frontend no Vercel (baseado no seu screenshot)
const VERCEL_FRONTEND_URL = 'https://sofia-tech-frontend.vercel.app'; 

// --- CONFIGURAÇÃO DO CORS ---
// Isso deve ser o primeiro middleware para interceptar todas as requisições.
app.use(cors({
  origin: VERCEL_FRONTEND_URL, // Permite requisições APENAS do seu frontend no Vercel
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Necessário se houver uso de cookies ou sessões de autenticação
}));

// Middlewares para processar requisições
app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// =======================================================
// 2. DEFINIÇÃO DAS ROTAS DA API
// =======================================================

// Rota de teste/inicial
app.get('/', (req, res) => {
  res.json({ message: "API SofiaTech rodando e CORS configurado!", status: "online" });
});

// Suas rotas específicas, utilizando os módulos de rotas
app.use('/api/vendas', vendasRoutes); 
// app.use('/api/crm', crmRoutes);
// app.use('/api/estoque', estoqueRoutes);
// ... Adicione as demais rotas aqui

// =======================================================
// 3. INICIALIZAÇÃO DO SERVIDOR
// =======================================================

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
