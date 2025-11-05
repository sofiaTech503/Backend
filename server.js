import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crmRoutes from "./routes/crmRoutes.js";
import vendasRoutes from "./routes/vendasRoutes.js";
import estoqueRoutes from './routes/estoqueRoutes.js';
import rhRoutes from "./routes/rhRoutes.js";
import financeiroRoutes from "./routes/financeiroRoutes.js";
import configuracoesRoutes from "./routes/configuracoesRoutes.js";

dotenv.config();
const app = express();

// Configuração CORS para permitir acesso do frontend (Vercel)
app.use(cors({
  origin: [
    "https://sofia-tech-frontend.vercel.app", // PRODUÇÃO
    "http://localhost:5173" // DESENVOLVIMENTO LOCAL
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota principal (teste da API)
app.get("/", (req, res) => {
  res.json({
    message: "🚀 API SofiaTech está rodando!",
    documentation: "Acesse /api/[modulo] para endpoints específicos.",
    status: "online"
  });
});

// Rotas principais
app.use("/api/crm", crmRoutes);
app.use("/api/vendas", vendasRoutes);
app.use("/api/estoque", estoqueRoutes);
app.use("/api/rh", rhRoutes);
app.use("/api/financeiro", financeiroRoutes);
app.use("/api/configuracoes", configuracoesRoutes);

// Porta dinâmica para Render (ou 3001 local)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
