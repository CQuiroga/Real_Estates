import { exit } from 'node:process';
import categories from './categories.js';
import prices from './prices.js';
import db from '../config/db.js';
import { Category, Price } from '../models/index.js'

const importData = async () => {

    try {

        // Auth
        await db.authenticate();

        // Cols generation
        await db.sync();

        // Insert data
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices)
        ]);

        console.log('Data imported succesfully');
        exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const dataDelete = async () => {
    try {
        await Promise.all([
            Category.destroy({where: {}, truncate: true}),
            Price.destroy({where: {}, truncate: true})
        ]);
        // await db.sync({ force: true })
        console.log('Data Deleted succesfully');
        exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

if (process.argv[2] === "-i") {
    importData();
}

if (process.argv[2] === "-d") {
    dataDelete();
}