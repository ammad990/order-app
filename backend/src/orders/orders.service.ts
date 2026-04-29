import { Injectable } from '@nestjs/common';
import { store } from '../data/store';
import { AppException } from '../common/error';

@Injectable()
export class OrdersService {

  createOrder(body: any) {
    const { studentId, items } = body;
    const student = this.getStudentById(studentId);
    const parent = this.getParentByStudent(student);
    const total = this.calculateOrderTotal(items, student);
    this.validateWalletBalance(parent, total);
    this.calculateWallet(parent, total);
    const order = this.saveOrder(studentId, items, total);
    return {
      success: true,
      order,
      balance: parent.walletBalance,
    };
  }

  getStudentById(studentId: number) {
    const student = store.students.find(s => s.id === studentId);
    if (!student) throw new AppException('NOT_FOUND', 'Student not found');
    return student;
  }

  getParentByStudent(student: any) {
    const parent = store.parents.find(p => p.id === student.parentId);
    if (!parent) {
      throw new AppException('NOT_FOUND', 'Parent not found');
    }
    return parent;
  }

  calculateOrderTotal(items: any[], student: any) {
    let total = 0;
    for (const item of items) {
      const menu = store.menuItems.find(m => m.id === item.menuItemId);

      if (!menu) {
        throw new AppException('NOT_FOUND', 'Menu not found');
      }

      if (!menu.available) {
        throw new AppException(
          'ITEM_UNAVAILABLE',
          `${menu.name} unavailable`,
        );
      }

      if (menu.allergens.some(a => student.allergens.includes(a))) {
        throw new AppException(
          'ALLERGEN',
          `${menu.name} has allergens`,
        );
      }

      total += menu.price * item.quantity;
    }

    return total;
  }

  validateWalletBalance(parent: any, total: number) {
    if (parent.walletBalance < total) {
      throw new AppException(
        'INSUFFICIENT_BALANCE',
        'Insufficient wallet balance',
      );
    }
  }

  calculateWallet(parent: any, total: number) {
    parent.walletBalance -= total;
  }

  saveOrder(studentId: number, items: any[], total: number) {
    const order = {
      id: store.orders.length + 1,
      studentId,
      items,
      total,
    };
    store.orders.push(order);
    return order;
  }

  getMenu() {
    return store.menuItems;
  }

  getStudent() {
    return store.students[0];
  }

  getParent() {
    return store.parents[0];
  }
}