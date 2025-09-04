const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Configurando banco de dados...\n');

try {
  // Gerar cliente Prisma
  console.log('📦 Gerando cliente Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Cliente Prisma gerado com sucesso!\n');

  // Aplicar schema ao banco
  console.log('🗄️ Aplicando schema ao banco de dados...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('✅ Schema aplicado com sucesso!\n');

  // Executar seed
  console.log('🌱 Populando banco com dados de teste...');
  execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' });
  console.log('✅ Dados de teste inseridos com sucesso!\n');

  console.log('🎉 Banco de dados configurado com sucesso!');
  console.log('\n📋 Próximos passos:');
  console.log('1. Configure suas variáveis de ambiente no arquivo .env');
  console.log('2. Execute: npm run dev');
  console.log('3. Acesse: http://localhost:3000');

} catch (error) {
  console.error('❌ Erro ao configurar banco de dados:', error.message);
  process.exit(1);
}
