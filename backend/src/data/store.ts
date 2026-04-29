type Parent = {
  id: number;
  name: string;
  walletBalance: number;
};

type Student = {
  id: number;
  name: string;
  allergens: string[];
  parentId: number;
};

type MenuItem = {
  id: number;
  name: string;
  price: number;
  allergens: string[];
  available: boolean;
};

type Order = {
  id: number;
  studentId: number;
  items: { menuItemId: number; quantity: number }[];
  total: number;
};

export const store: {
  parents: Parent[];
  students: Student[];
  menuItems: MenuItem[];
  orders: Order[];
} = {
  parents: [],
  students: [],
  menuItems: [],
  orders: [],
};