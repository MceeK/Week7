let mongoose = require('mongoose');

let developerSchema = mongoose.Schema({
    id: {
        type: Number,
        default: Math.round(Math.random()*1000),
        require: true
    },
    name: {
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String
        }
    },
    level: {
        type: String,
        require: true
    },
    address: {
        unit: {
            type: String,
            require: true
        },
        street: {
            type: String,
            require: true
        },
        suburb: {
            type: String,
            require: true
        },
        state: {
            type: String,
            require: true
        }
    }
});

let developerModel = mongoose.model("Developers", developerSchema);

module.exports = developerModel;