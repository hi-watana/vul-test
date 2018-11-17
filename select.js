var rl = require('readline').createInterface(process.stdin, process.stdout);

new Promise(function(resolve, reject) {
    rl.question('\033[1mSearch (product name):\033[0m ', function(product_name) {
        resolve(product_name);
    });
}).then(function(product_name) {
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('sqlite:database.sqlite3');

    sequelize.query('SELECT * FROM `items` WHERE product_name LIKE :product_name', {
        replacements: {
            product_name: [`%${product_name}%`]
        }
    }).spread((results, metadata) => {
        results.forEach(i => console.log(i));
        process.exit(0);
    });
});
