import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/orders/dtos/CreateOrder.dto';
import { Order } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
      ) {}
          
      getOrders() {
        return this.orderRepository.createQueryBuilder("order").getMany();
      }

      getOrdersForWeek(year: number, week: number) {
        // Get Monday of the given week
        let monday = this.getDateOfISOWeek(week, year);
        
        // Start date (Monday)
        let startDate = new Date(monday); 

        // End date (Friday) -> Monday + 4 days
        let endDate = new Date(monday);
        endDate.setDate(endDate.getDate() + 4);

        console.log("Start Date (Monday):", startDate);
        console.log("End Date (Friday):", endDate);

        return this.orderRepository.createQueryBuilder("order")
            .where("order.dateCreated >= :startDate", { startDate: startDate.toISOString() })
            .andWhere("order.dateCreated <= :endDate", { endDate: endDate.toISOString() })
            .getMany();
      }


      createOrder(createOrderDto: CreateOrderDto) {
        const newOrder = this.orderRepository.create(createOrderDto);
        console.log(createOrderDto)
        return this.orderRepository.save(newOrder);
      }
          
      updateOrder(order: Order) {
        console.log('update order')
        return this.orderRepository.update(order.id, order);
      }
      deleteOrder(order: Order) {
        console.log('delete order')
        return this.orderRepository
        .createQueryBuilder("order")
        .delete()
        .from(Order)
        .where("id = :id", {id: order.id})
        .execute();
      }

      private getDateOfISOWeek(w: number, y: number) {
        // Start with January 4th (which is always in ISO week 1)
        let jan4 = new Date(y, 0, 4);
    
        // Find the closest Thursday (ISO weeks always have January 4th in week 1)
        let thursday = new Date(jan4);
        thursday.setDate(jan4.getDate() - (jan4.getDay() + 6) % 7 + 3);

        // Calculate the first day of the given week
        let monday = new Date(thursday);
        monday.setDate(thursday.getDate() + (w - 1) * 7 - 3); // Subtract 3 to get Monday

        return monday;
      }
}

  
