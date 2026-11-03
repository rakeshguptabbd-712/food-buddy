import { Router, Request, Response } from 'express';
import { User } from '../models/user.model.js';
import { MenuItem } from '../models/menu-item.model.js';
import { Category } from '../models/category.model.js';
import { Restaurant } from '../models/restaurant.model.js';
import { Order } from '../models/order.model.js';
import { catchAsync } from '../middleware/async-handler.js';

const router = Router();

router.get('/overview', catchAsync(async (_req: Request, res: Response) => {
  const [users, menuItems, categories, restaurants, orders] = await Promise.all([
    User.find().select('-password').sort({ createdAt: -1 }).lean(),
    MenuItem.find().populate('category', 'name').sort({ createdAt: -1 }).lean(),
    Category.find().sort({ sortOrder: 1 }).lean(),
    Restaurant.find().lean(),
    Order.find().sort({ createdAt: -1 }).limit(50).lean(),
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats: {
        totalUsers: users.length,
        totalMenuItems: menuItems.length,
        totalCategories: categories.length,
        totalRestaurants: restaurants.length,
        totalOrders: orders.length,
      },
      collections: {
        users,
        menuItems,
        categories,
        restaurants,
        orders,
      },
    },
  });
}));

export default router;

