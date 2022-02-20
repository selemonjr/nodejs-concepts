// White list
const whiteList = ['https://www.google.com', 'http://localhost:3500'] // => Only these urls can access the api
const corsOptions = {
    origin: (origin,callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null,true)
        } else {
            callback(new Error('Not allowed by Cors'))
        }
    },
    optionSuccessStatus:200
};
module.exports = corsOptions;