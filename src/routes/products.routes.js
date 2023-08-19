import { Router } from "express";
import ProductManager from "../utils/ProductManager.js";

const manager = new ProductManager("./src/JSON/products.json");
const prodRouter = Router({ caseSensitive: false });

prodRouter.get("/", (req, res) => {
  const { limit } = req.query;

  try {
    const productos = manager.getProducts();

    if (limit) {
      const prods = productos.slice(0, limit);
      res.status(200).send(prods);
    } else {
      res.status(200).send(productos);
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

prodRouter.get("/:pid", (req, res) => {
  const prodId = parseInt(req.params.pid);
  const prod = manager.getProductById(prodId);

  try {
    if (prod) {
      res.status(200).send(prod);
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

prodRouter.post("/", (req, res) => {
  const confirmation = manager.addProduct(req.body);

  try {
    if (confirmation) {
      return res.status(200).send({ success: "Producto creado correctamente" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

prodRouter.put("/:pid", (req, res) => {
  const prodId = parseInt(req.params.pid);
  const propertyToUpdate = req.body.property;
  const newValue = req.body.newValue;
  const confirmation = manager.updateProducts(
    prodId,
    propertyToUpdate,
    newValue
  );

  try {
    if (confirmation) {
      res.status(200).send({ success: "Producto actualizado correctamente" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

prodRouter.delete("/:pid", (req, res) => {
  const prodId = parseInt(req.params.pid);
  const confirmation = manager.deleteProducts(prodId);

  try {
    if (confirmation) {
      return res
        .status(200)
        .send({ success: "Producto borrado correctamente" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

export default prodRouter;
