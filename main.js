var rl = require('readline').createInterface(process.stdin, process.stdout);

new Promise(function(resolve, reject) {
    console.log('This is a simple register program.\nInput a product name and its price.\n');
    rl.question('\033[1mProduct name:\033[0m ', function(product_name) {
        rl.question('\033[1mPrice (Yen):\033[0m ', function(line) {
            var x = parseFloat(line)
            var price = parseInt(line)
            if (isNaN(x) || price < 0 || x !== price ) {
                console.log('\033[031mError: Invalid price\033[0m');
                process.exit(1);
            }
            console.log('\n');
            resolve({product_name: product_name, price: price});
        });
    });
}).then(function(data) {
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('sqlite:database.sqlite3');

    const Item = sequelize.define('item', {
        product_name: Sequelize.STRING,
        price: Sequelize.INTEGER,
    }, {
        timestamps: false,
    });

    sequelize.sync()
        .then(() => Item.create(data))
        .then(i => {
            console.log('\n\n\033[032mItem was successfully registered:\033[0m\n\n', i.toJSON(), '\n');
            process.exit(0);
        });
});
