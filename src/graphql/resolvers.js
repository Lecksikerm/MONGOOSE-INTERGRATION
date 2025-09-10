const Product = require('../models/Product');

const resolvers = {
  Query: {
    // Fetch all products
    products: async () => {
      try {
        return await Product.find({});
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
      }
    },

    // Fetch a single product by ID
    product: async (_, { id }) => {
      try {
        console.log("Searching for product with id:", id);
        const result = await Product.findById(id);
        console.log("Found:", result);
        return result;
      } catch (error) {
        console.error("Error fetching product:", error);
        throw new Error("Failed to fetch product");
      }
    },
  },

  Mutation: {
    // Create a new product
    createProduct: async (_, { title, category, price, inStock }) => {
      try {
        const newlyCreatedProduct = new Product({
          title,
          category,
          price,
          inStock,
        });

        await newlyCreatedProduct.save();
        return newlyCreatedProduct;
      } catch (error) {
        console.error("Error creating product:", error);
        throw new Error("Failed to create product");
      }
    },
    updateProduct : async(_, {id, ...updadatedFields})=> {
      return await Product.findByIdAndUpdate(id, updadatedFields, {new : true});
    },

    deleteProduct : async(_, {id})=> {
      const deletedProduct = await Product.findByIdAndDelete(id);

      return !!deletedProduct;
    }
  },
};

module.exports = resolvers;



