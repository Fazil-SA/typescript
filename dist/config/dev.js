"use strict";
const port = process.env.PORT || 3000;
module.exports = {
    // config for master database
    database: {
        url: process.env.MONGO_ATLAS_URL,
        properties: { useNewUrlParser: true },
    },
};
