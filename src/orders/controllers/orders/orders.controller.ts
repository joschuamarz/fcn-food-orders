import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Delete,
    UsePipes,
    ValidationPipe,
    } from '@nestjs/common';
    import { CreateOrderDto } from 'src/orders/dtos/CreateOrder.dto';
    import { OrdersService } from 'src/orders/services/orders/orders.service'; 
import { Order } from 'src/typeorm';

@Controller('api/orders')
export class OrdersController {

    constructor(private readonly orderService: OrdersService) {}
      
      @Get()
      getOrders() {
        return this.orderService.getOrders();
      }
      
      @Get(':year/:week')
      getOrdersForWeek(@Param('year') year: number, @Param('week') week: number) {
        return this.orderService.getOrdersForWeek(year, week);
      }
      
      @Post('create')
      @UsePipes(ValidationPipe)
      createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.createOrder(createOrderDto);
      }

      @Delete('delete')
      @UsePipes(ValidationPipe)
      updateOrder(@Body() order: Order) {
        return this.orderService.updateOrder(order);
      }

      @Patch()
      deleteOrder(@Body() order: Order) {
        console.log(order);
        return this.orderService.deleteOrder(order);
      }
}


    
   