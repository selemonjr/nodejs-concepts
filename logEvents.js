// Read and write files

// const fs = require('fs');
// const path = require('path')
// fs.readFile(path.join(__dirname,'files','starter.txt'), 'utf-8', (err,data) => {
//     if(err) throw err;
//     console.log(data)
// });

// fs.writeFile(path.join(__dirname,'files','reply.txt'), 'Nice to meet you', (err) => {
//     if(err) throw err;
//     console.log("Completed")
// })

const {format} = require('date-fns');
const {v4: uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const logEvents = async (message) => {
    const dateTime = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        //testing
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    } catch(err) {
        console.log(err)
    }
}
module.exports = logEvents;