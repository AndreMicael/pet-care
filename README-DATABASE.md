# Configuração do Banco de Dados - Pet Care

## Pré-requisitos

1. **MySQL** instalado e rodando
2. **Node.js** e **npm** instalados

## Configuração

### 1. Configurar Variáveis de Ambiente

Copie o arquivo `env.example` para `.env` e configure suas credenciais:

```bash
cp env.example .env
```

Edite o arquivo `.env` com suas credenciais do MySQL:

```env
DATABASE_URL="mysql://seu_usuario:sua_senha@localhost:3306/petcare"
SHADOW_DATABASE_URL="mysql://seu_usuario:sua_senha@localhost:3306/petcare_shadow"
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Gerar Cliente Prisma

```bash
npm run db:generate
```

### 4. Criar e Configurar o Banco

```bash
# Criar o banco de dados no MySQL
mysql -u seu_usuario -p
CREATE DATABASE petcare;
CREATE DATABASE petcare_shadow;
exit

# Configurar banco automaticamente (recomendado)
npm run db:setup

# OU configurar manualmente:
# npm run db:generate
# npm run db:push
# npm run db:seed
```

### 6. Iniciar o Servidor

```bash
npm run dev
```

## Scripts Disponíveis

- `npm run db:generate` - Gera o cliente Prisma
- `npm run db:push` - Aplica o schema ao banco
- `npm run db:seed` - Popula o banco com dados de teste
- `npm run db:studio` - Abre o Prisma Studio (interface visual)

## Estrutura do Banco

O banco inclui as seguintes tabelas principais:

- **Owner** - Donos de pets
- **Sitter** - Cuidadores
- **Address** - Endereços (relacionado a Owner e Sitter)
- **Pet** - Pets
- **Reservation** - Reservas/Agendamentos
- **Service** - Serviços oferecidos
- **ServiceType** - Tipos de serviços
- **Specialty** - Especialidades dos cuidadores
- **Review** - Avaliações

### Relacionamentos de Endereço

- **Owner** → **Address** (1:1) - Cada dono tem um endereço
- **Sitter** → **Address** (1:1) - Cada cuidador tem um endereço
- **Address** contém: rua, número, cidade, estado, CEP, bairro, complemento

## Testando o Sistema

Após configurar o banco:

1. Acesse `http://localhost:3000`
2. Faça uma busca por cuidadores
3. Selecione um cuidador
4. Preencha o formulário de agendamento
5. Verifique se a reserva foi criada no banco

## Dados de Teste

O seed cria:
- 5 cuidadores com diferentes especialidades
- 7 tipos de serviços
- 9 especialidades
- Dados realistas para teste

## Troubleshooting

### Erro de Conexão com o Banco

Verifique se:
- MySQL está rodando
- Credenciais estão corretas no `.env`
- Bancos `petcare` e `petcare_shadow` existem

### Erro de Schema

Execute:
```bash
npm run db:generate
npm run db:push
```

### Limpar e Recriar

```bash
# Deletar bancos
mysql -u seu_usuario -p
DROP DATABASE petcare;
DROP DATABASE petcare_shadow;
CREATE DATABASE petcare;
CREATE DATABASE petcare_shadow;
exit

# Recriar schema e dados
npm run db:push
npm run db:seed
```
