import { Request, Response, Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { handleInputError } from './modules/middleware';
import { createProduct, deleteProduct, getOne, getUserProducts, updateProduct } from './handlers/products';
import { createUpdate, deleteUpdate, getAllUpdatesByUser, getOneUpdate, updateUpdate } from './handlers/update';

const router = Router();


// Product
router.get('/product', getUserProducts);

router.get('/product/:id', getOne); 

router.put('/product/:id',
  body('name').isString(),
  body('description').isString(),
  handleInputError,
  updateProduct
);

router.post('/product',
  body('name').isString(),
  body('description').isString(),
  handleInputError,
  createProduct
);

router.delete('/product/:id', deleteProduct);


// Update
router.get('/update', getAllUpdatesByUser);

router.get('/update/:id', getOneUpdate);

router.put('/update/:id',
  body('title').optional().isString(),
  body('body').optional().isString(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  handleInputError,
  updateUpdate
);

router.post('/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  handleInputError,
  createUpdate
);

router.delete('/update/:id',
  deleteUpdate
);


// Update Point
router.get('/updatepoint', (req: Request, res: Response) => {});

router.get('/updatepoint/:id', (req: Request, res: Response) => {});

router.put('/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  (req: Request, res: Response) => {});

router.post('/updatepoint',
  body('name').exists().isString(),
  body('description').exists().isString(),
  handleInputError,
  (req: Request, res: Response) => {});

router.delete('/updatepoint/:id', (req: Request, res: Response) => {});

export default router;
