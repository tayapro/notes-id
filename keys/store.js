import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    private: {
        type: String,
        required: true,
    },
    public: {
        type: String,
        required: true,
    },
    lastUpdate: {
        type: Number,
        required: true,
        default: () => Date.now(),
    },
    type: {
        type: String,
        required: true,
        unique: true,
    },
})

const Key = mongoose.model('keys', schema)
//Key.syncIndexes()

async function readKeys() {
    const keys = await Key.findOne({ type: 'keypair' })
    if (!keys) {
        throw new Error('Key is not found')
    }

    return {
        private: keys.private,
        public: JSON.parse(keys.public),
        lastUpdate: keys.lastUpdate,
    }
}

async function writeKeys(privateKey, publicKey) {
    let key = await Key.findOne({ type: 'keypair' })

    if (!key) {
        key = new Key({
            type: 'keypair',
        })
    }

    key.lastUpdate = Date.now()
    key.private = privateKey
    key.public = JSON.stringify(publicKey)
    await key.save()
}

export { writeKeys, readKeys }

export default {
    writeKeys,
    readKeys,
}
