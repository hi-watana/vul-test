CREATE TABLE `users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `username` VARCHAR(255), `password` VARCHAR(255));
INSERT INTO `users` VALUES (NULL, 'Freddie', 'Password0')
    ,(NULL, 'Brian', 'gjaoihao0321')
    ,(NULL, 'John', 'tai4a0490a49_')
    ,(NULL, 'Rogger', '&&?las??A?');
CREATE TABLE `items` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `user_id` INTEGER, `item_name` VARCHAR(255), `price` INTEGER);
INSERT INTO `items` VALUES (NULL, 1, 'microphone', 100000)
    ,(NULL, 2, 'red special', 1000000)
    ,(NULL, 4, 'drum', 500000)
    ,(NULL, 3, 'apple', 100)
    ,(NULL, 3, 'electric base', 400000)
    ,(NULL, 1, 'piano', 1000000)
    ,(NULL, 4, 'pencil', 90)
    ,(NULL, 2, 'dictionary', 5000)
    ,(NULL, 2, 'telescope', 5000)
    ,(NULL, 1, 'notebook', 100)
    ,(NULL, 4, 'pen', 1000)
    ,(NULL, 3, 'laptop', 200000)
