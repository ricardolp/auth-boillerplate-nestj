/*
  Warnings:

  - You are about to drop the column `fbToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fbToken";

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "empresa" TEXT,
    "centro_origem" TEXT,
    "centro_destino" TEXT,
    "portaria" TEXT,
    "processo" TEXT,
    "tipo_processo" TEXT NOT NULL,
    "parceiro" TEXT NOT NULL,
    "propriedade" TEXT NOT NULL,
    "cultura" TEXT NOT NULL,
    "deposito" TEXT NOT NULL,
    "safra" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "placa_veiculo" TEXT NOT NULL,
    "placa_cavalo" TEXT NOT NULL,
    "tipo_veiculo" TEXT NOT NULL,
    "nome_motorista" TEXT NOT NULL,
    "tipo_nf" TEXT NOT NULL,
    "numero_nf" TEXT NOT NULL,
    "serie_nf" TEXT NOT NULL,
    "chave_nf" TEXT NOT NULL,
    "changed_by" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_id_key" ON "Ticket"("id");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
