const { prompt } = require('enquirer');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('', '', '', {
    dialect: 'sqlite',
    storage: 'database.sqlite3',
    logging: false
});

new Promise((resolve, reject) => {
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
}).then(user_id => {
    let question = [
        {
            type: 'input',
            name: 'item_name',
            message: 'Item name'
        }
    ];
    prompt(question).then(answers => {
        var item_name = answers['item_name'];
        if (item_name == null) {
            var item_name = '';
        }

        // Essential point
        // This part contains a critical vulnerability.
        // (ref: https://nvd.nist.gov/vuln/detail/CVE-2016-10556)
        sequelize.query('SELECT item_name, price FROM `items` WHERE user_id = :user_id AND item_name LIKE :item_name', {
            replacements: {
                user_id: [user_id],
                item_name: [`%${item_name}%`]
            }
        }).spread((results, metadata) => {
            console.log('\n\nExecuted query:\n\033[1m', metadata['sql'], '\033[0m\n\n', `\n${results.length} items found:`);
            results.forEach(i => console.log(i));
            process.exit(0);
        });
    });
});

