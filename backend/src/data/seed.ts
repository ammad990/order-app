import { store } from './store';

export function seedData() {
  // Parent
  store.parents.push({
    id: 1,
    name: 'John Doe',
    walletBalance: 50,
  });

  // Students
  store.students.push(
    {
      id: 1,
      name: 'Alice',
      allergens: ['nuts', 'dairy'],
      parentId: 1,
    },
  );

  // Menu Items
  store.menuItems.push(
    {
      id: 1,
      name: 'Peanut Butter Sandwich',
      price: 10,
      allergens: ['nuts'],
      available: true,
    },
    {
      id: 2,
      name: 'Veg Sandwich',
      price: 59,
      allergens: [],
      available: true,
    },
    {
      id: 3,
      name: 'Cheese Burger',
      price: 12,
      allergens: ['dairy'],
      available: true,
    },
    {
      id: 4,
      name: 'Chicken Wrap',
      price: 11,
      allergens: ['gluten'],
      available: true,
    },
    {
      id: 5,
      name: 'Fruit Salad',
      price: 6,
      allergens: [],
      available: true,
    },
    {
      id: 6,
      name: 'Ice Cream',
      price: 5,
      allergens: ['dairy'],
      available: false,
    },
    {
      id: 7,
      name: 'Chocolate Cake',
      price: 9,
      allergens: ['gluten', 'dairy'],
      available: true,
    },
    {
      id: 8,
      name: 'Protein Bar',
      price: 4,
      allergens: ['nuts', 'soy'],
      available: false,
    }
  );
}