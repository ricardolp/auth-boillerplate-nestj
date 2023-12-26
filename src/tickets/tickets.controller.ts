import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, HttpStatus } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AuthGuard } from '../auth/auth.guard';
import { deserialize, serialize } from 'class-transformer';
import { Ticket } from './entities/ticket.entity';

@UseGuards(AuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    createTicketDto.userId = req.user.sub;

    const ticket = this.ticketsService.create(createTicketDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'ok',
      data: ticket
   };
  }

  @Get()
  async findAll(@Query() q: string) {
    const tickets = serialize(await this.ticketsService.findAll(q));
    
    return {
      statusCode: HttpStatus.OK,
      message: 'ok',
      data: deserialize(Ticket, tickets)
   };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}
