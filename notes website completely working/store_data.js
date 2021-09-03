const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://babayaga:deadpool%4023@cluster0-thfbe.mongodb.net/newnotesapp?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const data_schema = mongoose.Schema({
    storedata: {
        type: String
    },
    user_id: {
        type: String
    },
    title: {
        type: String
    }
})

const data = mongoose.model('data', data_schema)//first argument is the name of the model & 2n argument is the schema name
module.exports = data;