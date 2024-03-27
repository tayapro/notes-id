import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('users', schema)
//Note: https://www.mongodb.com/community/forums/t/atlas-enforcing-uniqueness-when-it-shouldnt/123824/2
//Have to restart application (rs) when collection or DB are removed
User.syncIndexes()
export default User
