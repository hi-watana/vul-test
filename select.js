const Sequelize = require('sequelize');
const sequelize = new Sequelize('', '', '', {
    dialect: 'sqlite',
    storage: 'database.sqlite3',
    logging: false
});

var rl = require('readline').createInterface(process.stdin, process.stdout);

new Promise(function(resolve, reject) {
    rl.question('\033[1mLogin username:\033[0m ', function(username) {
        rl.question('\033[1mPassword:\033[0m ', function(password) {
            const User = sequelize.define('user', {
                username: Sequelize.STRING,
                password: Sequelize.STRING,
            }, {
                timestamps: false,
            });

            User.findAll({
                attributes: ['id'],
                where: {
                    username: username,
                    password: password,
                }
            }).then(res => {
                if (res.length === 0) {
                    console.log('\033[031mInvalid username or password\033[0m');
                    process.exit(1);
                }
                resolve(res[0]['dataValues']['id']);
            });
        });
    })
}).then(function(user_id) {
    new Promise(function(resolve, reject) {
        rl.question('\033[1mSearch (product name):\033[0m ', function(product_name) {
            resolve(product_name);
        });
    }).then(function(product_name) {
        sequelize.query('SELECT product_name, price FROM `items` WHERE user_id = :user_id AND product_name LIKE :product_name', {
            replacements: {
                user_id: [user_id],
                product_name: [`%${product_name}%`]
            }
        }).spread((results, metadata) => {
            console.log('\n\n', metadata, '\n\n');
            results.forEach(i => console.log(i));
            process.exit(0);
        });
    });
});

