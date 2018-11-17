const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:database.sqlite3');

const Item = sequelize.define('item', {
    product_name: Sequelize.STRING,
    price: Sequelize.INTEGER,
}, {
    timestamps: false,
});

[
    ['pen', 400],
    ['apple', 70],
    ['pencil', 100],
    ['note', 200],
    ['bag', 4000],
    ['wallet', 3000],
].forEach((a) => {
    var product_name = a[0];
    var price = a[1];
    sequelize.sync()
        .then(() => Item.create({
            product_name: product_name,
            price: price
        }))
        .then(i => {
        });
});
