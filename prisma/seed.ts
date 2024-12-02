import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cellId = '9a7f2d7c-5d54-42c6-bfd9-8c84ad367964'; // ID da célula fornecido
  const tenantId = '05526d57-309d-40ac-bb37-c970f1cf9ca7'
  
  const startDate = new Date(new Date().getFullYear(), 0, 1); // 1º de janeiro deste ano
  const endDate = new Date(); // Hoje
  
  const dateRange = [];
  let currentDate = startDate;

  // Criar registros para cada semana do ano
  while (currentDate <= endDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 7); // Incrementa por semana
  }

  // Inserir dados no banco de dados
  for (const date of dateRange) {
    await prisma.reports.create({
      data: {
        cell_day: date,
        cell_id: cellId,
        number_of_members: Math.floor(Math.random() * (15 - 5 + 1)) + 5,  // 5 a 15 membros
        visitors: Math.floor(Math.random() * (10 - 1 + 1)) + 1, // 1 a 10 visitantes
        regulars: Math.floor(Math.random() * (10 - 3 + 1)) + 3,  // 3 a 10 assíduos,
        tenant_id: tenantId
      },
    });
  }

  console.log('Seed concluído com sucesso!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });