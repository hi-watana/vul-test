const { prompt } = require('enquirer');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('', '', '', {
    dialect: 'sqlite',
    storage: 'database.sqlite3',
    logging: false
});

new Promise(function(resolve, reject) {
    let question = [
        {
            type: 'input',
            name: 'username',
            message: 'Login username'
        },
        {
            type: 'password',
            name: 'password',
            message: 'Password'
        }
    ];
    prompt(question).then(answers => {

        const User = sequelize.define('user', {
            username: Sequelize.STRING,
            password: Sequelize.STRING,
        }, {
            timestamps: false,
        });

        User.findAll({
            attributes: ['id'],
            where: answers
        }).then(res => {
            if (res.length === 0) {
                console.log('\033[031mInvalid username or password\033[0m');
                process.exit(1);
            }
            resolve(res[0]['dataValues']['id']);
        });
    });
}).then(function(user_id) {
    let question = [
        {
            type: 'input',
            name: 'item_name',
            message: 'Item name'
        }
    ];
    prompt(question).then(answers => {
        let item_name = answers['item_name'];
        sequelize.query('SELECT item_name, price FROM `items` WHERE user_id = :user_id AND item_name LIKE :item_name', {
            replacements: {
                user_id: [user_id],
                item_name: [`%${item_name}%`]
            }
        }).spread((results, metadata) => {
            console.log('\n\n', metadata, '\n\n', `\n${results.length} items found:`);
            results.forEach(i => console.log(i));
            process.exit(0);
        });
    });
});

