const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://babayaga:deadpool%4023@cluster0-thfbe.mongodb.net/newnotesapp?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const bunk_schema = mongoose.Schema({
    user_id: {
        type: String
    },
    title: {
        type: String
    }
    ,
    date: {
        type: String
    }
})

const bunk = mongoose.model('bunk', bunk_schema)
module.exports = bunk;