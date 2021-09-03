const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://babayaga:deadpool%4023@cluster0-thfbe.mongodb.net/newnotesapp?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const led_schema = mongoose.Schema({
    ledstatus: {
        type: String
    },
    user_id: {
        type: String
    },
    room: {
        type: String
    }
})

const led = mongoose.model('led', led_schema)
module.exports = led;