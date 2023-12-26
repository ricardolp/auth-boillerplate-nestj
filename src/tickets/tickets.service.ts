import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/database/prisma.service';
import { processQuery } from 'src/utils';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService){}

  async create(createTicketDto: CreateTicketDto) {
    const { empresa, centro_origem, centro_destino, portaria, processo,
      tipo_processo, parceiro, propriedade, cultura, deposito, safra,
      material, unidade_medida, placa_veiculo, placa_cavalo, tipo_veiculo,
      nome_motorista, tipo_nf, numero_nf, serie_nf, chave_nf, status, integracao, userId } = createTicketDto;

    const ticket = await this.prisma.ticket.create({
      data: {
        id: randomUUID(), 
        empresa: empresa || "",
        centro_origem: centro_origem || '',
        centro_destino: centro_destino || '',
        portaria: portaria || '',
        processo: processo || '',
        tipo_processo: tipo_processo || '',
        parceiro: parceiro || '',
        propriedade: propriedade || '',
        cultura: cultura || '',
        deposito: deposito || '',
        safra: safra || '',
        material: material || '',
        unidade_medida: unidade_medida || '',
        placa_veiculo: placa_veiculo || '',
        placa_cavalo: placa_cavalo || '',
        tipo_veiculo: tipo_veiculo || '',
        nome_motorista: nome_motorista || '',
        tipo_nf: tipo_nf || '',
        numero_nf: numero_nf || '',
        serie_nf: serie_nf || '',
        chave_nf: chave_nf || '',
        status: status || '',
        integracao: integracao || '',
        userId: userId,
      }
    });

    return ticket;
  }

  async findAll(q: any) {
    const query = processQuery(q)
    return await this.prisma.ticket.findMany({ where: query });
  }

  async findOne(id) {
    const ticket = await this.prisma.ticket.findUnique({where: { id }})
    return ticket
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  async remove(id) {
    const ticket = this.prisma.user.delete({ where: { id }});
    return ticket;
  }
}
