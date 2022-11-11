import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UsePipes,
    ValidationPipe,
    } from '@nestjs/common';
    import { CreateOrderDto } from 'src/orders/dtos/CreateOrder.dto';
    import { OrdersService } from 'src/orders/services/orders/orders.service'; 

@Controller('orders')
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
}


    
   