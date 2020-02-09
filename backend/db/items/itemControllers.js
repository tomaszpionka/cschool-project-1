class ItemControllers {
  constructor() {
    this.tableItem = "items";
    this.connection = require("../connection");
  }

  insertItem(userId, itemName, category, description, images) {
    const sql = `INSERT INTO ${this.tableItem} VALUES (
    DEFAULT, ${parseInt(
      userId
    )}, '${itemName}', '${category}', '${description}', '${JSON.stringify(
      images
    )}'
    )`;

    return this.connection.query(sql);
  }

  collectImgsPath(files) {
    const images = {};
    for (let i = 0; i < files.length; i++) {
      images[`img${i}`] = files[i].path;
    }

    return images;
  }

  getAllItems() {
    const sql = `
    SELECT * FROM ${this.tableItem};
    `;
    return this.connection.query(sql);
  }

  getItem(id) {
    const sql = `SELECT * FROM ${this.tableItem} WHERE item_id = ${id}`;
    return this.connection.query(sql);
  }

  deleteItem(id) {
    const sql = `DELETE FROM ${this.tableItem} WHERE item_id = ${id} RETURNING *`;
    return this.connection.query(sql);
  }
}

module.exports = ItemControllers;