const db = require("../database/db");
const Order = require("../models/order");
const { QueryTypes } = require("sequelize");

const createOrder = async (req, res) => {
  try {
    const { item_id, item_owner, item_buyer } = req.params;
    const order = await db.sequelize.query(
      `SELECT * FROM orders WHERE item_id = '${item_id}' AND item_buyer = '${item_buyer}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (order.length > 0) {
      return res.status(401).json("order already exists");
    }
    Order.create({
      item_id: item_id,
      item_owner: item_owner,
      item_buyer: item_buyer,
      order_init: true,
    })
      .then(() => {
        res.json("order created");
      })
      .catch((error) => {
        res.status(500).send(`SQL ERROR ${error}`);
      });
  } catch (error) {
    console.error(error.message);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await db.sequelize.query(`SELECT * FROM orders`, {
      type: QueryTypes.SELECT,
    });
    res.json(orders);
  } catch (error) {
    console.error(error.message);
  }
};

const updateProcess = async (req, res) => {
  try {
    const { order_id, item_id, process } = req.params;
    if (process === "true") {
      const offer = await db.sequelize.query(
        `SELECT * from orders WHERE item_id = '${item_id}' and order_process = 'true'`,
        {
          type: QueryTypes.SELECT,
        }
      );
      if (offer.length > 0) {
        return res.status(401).json("offer already confirmed");
      } else {
        const updateOffer = await db.sequelize.query(
          `UPDATE orders SET order_process = '${process}' WHERE order_id = '${order_id}' RETURNING *`
        );

        if (updateOffer[0].length === 0) {
          return res.json("this offer is not yours");
        }
        res.json(updateOffer[0]);
      }
    } else {
      const updateOffer = await db.sequelize.query(
        `UPDATE orders SET order_process = '${process}' WHERE order_id = '${order_id}' RETURNING *`
      );
      if (updateOffer[0].length === 0) {
        return res.json("this offer is not yours");
      }
      res.json(updateOffer[0]);
    }
  } catch (err) {
    console.error(err.message);
  }
};

const confirmOrder = async (req, res) => {
  try {
    const { order_id, item_buyer, item_id } = req.params;
    await db.sequelize.query(
      `UPDATE orders SET order_success = 'true' WHERE order_id = '${order_id}' RETURNING *`
    );
    await db.sequelize.query(
      `UPDATE items SET item_owner = '${item_buyer}' WHERE item_id = '${item_id}' RETURNING *`
    );
    await db.sequelize.query(
      `UPDATE orders SET item_owner = '${item_buyer}', order_process = 'false' WHERE item_id = '${item_id}' RETURNING *`
    );
    await db.sequelize.query(
      `DELETE FROM orders WHERE order_id = '${order_id}' RETURNING *`
    );
    res.json("order confirmed");
  } catch (err) {
    console.error(err.message);
  }
};
const deleteOrder = async (req, res) => {
  try {
    const { order_id, item_buyer } = req.params;
    const deleteOrder = await db.sequelize.query(
      `DELETE FROM orders WHERE order_id = '${order_id}' AND item_buyer = '${item_buyer}' RETURNING *`
    );
    res.json(deleteOrder[0]);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateProcess,
  confirmOrder,
  deleteOrder,
};
