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
        console.log(year);
        console.log(week);
        var refDate = this.getDateOfISOWeek(week, year);
        console.log(refDate);
        var startDate = this.getDateOfISOWeek(week, year);
        startDate.setDate(startDate.getDate() - startDate.getDay() - 2);
        var endDate = this.getDateOfISOWeek(week, year);
        endDate.setDate(endDate.getDate() - endDate.getDay() + 4);
        console.log(startDate);
        console.log(endDate);
        return this.orderRepository.createQueryBuilder("order")
        .where("order.dateCreated >= :startDate", { startDate: startDate })
        .andWhere("order.dateCreated <= :endDate", { endDate: endDate })
        .getMany();
      }


      createOrder(createOrderDto: CreateOrderDto) {
        const newOrder = this.orderRepository.create(createOrderDto);
        console.log(createOrderDto)
        return this.orderRepository.save(newOrder);
      }
          
      updateOrder(order: Order) {
        return this.orderRepository.update(order.id, order);
      }
      deleteOrder(order: Order) {
        const id: bigint = BigInt(order.id);
        return this.orderRepository
        .createQueryBuilder("order")
        .delete()
        .from(Order)
        .where("id = :id", {id: order.id})
        .execute();
      }

      private getDateOfISOWeek(w: number, y: number) {
        var simple = new Date(y, 0, 1 + (w - 1) * 7);
        var dow = simple.getDay();
        var ISOweekStart = simple;
        if (dow <= 4)
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        return ISOweekStart;
    }
}

  
