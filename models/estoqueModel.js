import { DataTypes } from 'sequelize';
// Importa a instância de conexão do seu arquivo db.js
import sequelize from '../config/db.js'; // Ajuste o caminho se necessário!

const Produto = sequelize.define('Produto', {
    // ID é gerado automaticamente pelo Sequelize
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // Informações Básicas
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    sku: { // Stock Keeping Unit (Código de Referência)
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    descricao: {
        type: DataTypes.TEXT
    },

    // Informações de Preço
    precoCusto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    precoVenda: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },

    // Informações de Estoque
    quantidadeEmEstoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    unidadeDeMedida: {
        type: DataTypes.STRING(10),
        defaultValue: 'UN'
    }
}, {
    // Nome da tabela no banco de dados
    tableName: 'produtos',
    // Adiciona created_at e updated_at (por padrão no Sequelize)
    timestamps: true 
});

// Exporta o modelo como 'default' para resolver o seu erro
export default Produto;