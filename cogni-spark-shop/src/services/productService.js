import fs from 'fs';
import path from 'path';

const PRODUCTS_DB_PATH = path.join(process.cwd(), 'public', 'products', 'products.json');
const ENGINE2_JSON_PATH = path.join(process.cwd(), 'public', 'products', 'engine2_catalog.json');

// Ensure directory exists
const ensureDir = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Load products from database
export const loadProducts = () => {
  try {
    ensureDir(PRODUCTS_DB_PATH);
    if (fs.existsSync(PRODUCTS_DB_PATH)) {
      const data = fs.readFileSync(PRODUCTS_DB_PATH, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

// Save product to main website database
export const saveProduct = (catalogJSON) => {
  try {
    ensureDir(PRODUCTS_DB_PATH);
    
    const products = loadProducts();
    
    const newProduct = {
      ...catalogJSON,
      id: catalogJSON.product_id,
      slug: `${catalogJSON.product_title?.toLowerCase().replace(/\s+/g, '-')}-${catalogJSON.product_id}`,
      status: 'active',
      visibility: 'public',
      rating: 0,
      reviews_count: 0,
      in_stock: true,
    };

    products.push(newProduct);

    fs.writeFileSync(PRODUCTS_DB_PATH, JSON.stringify(products, null, 2));
    
    return newProduct;
  } catch (error) {
    throw new Error(`Failed to save product: ${error.message}`);
  }
};

// Save to Engine 2 JSON catalog
export const saveToEngine2Catalog = (catalogJSON) => {
  try {
    ensureDir(ENGINE2_JSON_PATH);

    let engine2Catalog = [];
    if (fs.existsSync(ENGINE2_JSON_PATH)) {
      const data = fs.readFileSync(ENGINE2_JSON_PATH, 'utf-8');
      engine2Catalog = JSON.parse(data);
    }

    const engine2Entry = {
      product_id: catalogJSON.product_id,
      category: catalogJSON.category,
      catalog_data: catalogJSON,
      processed_at: new Date().toISOString(),
      status: 'pending_engine2_processing',
    };

    engine2Catalog.push(engine2Entry);

    fs.writeFileSync(ENGINE2_JSON_PATH, JSON.stringify(engine2Catalog, null, 2));

    return engine2Entry;
  } catch (error) {
    throw new Error(`Failed to save to Engine 2 catalog: ${error.message}`);
  }
};

// Get all products
export const getAllProducts = () => {
  return loadProducts();
};

// Get product by ID
export const getProductById = (productId) => {
  const products = loadProducts();
  return products.find(p => p.product_id === productId);
};

// Get Engine 2 catalog
export const getEngine2Catalog = () => {
  try {
    if (fs.existsSync(ENGINE2_JSON_PATH)) {
      const data = fs.readFileSync(ENGINE2_JSON_PATH, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading Engine 2 catalog:', error);
    return [];
  }
};
