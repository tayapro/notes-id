import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        unique: true,
    },
})

const Key = mongoose.model('keys', schema)
//Key.syncIndexes()

async function readPrivateKey() {
    const keys = await Key.findOne({ type: 'private' })
    if (!keys) {
        throw new Error('Key is not found')
    }

    return keys.value
}

async function writePrivateKey(privateKey) {
    let key = await Key.findOne({ type: 'private' })

    if (!key) {
        key = new Key({
            type: 'private',
        })
    }

    key.value = privateKey
    await key.save()
}

function readPublicKey() {}

async function writePublicKey(publicKey) {
    let key = await Key.findOne({ type: 'public' })

    if (!key) {
        key = new Key({
            type: 'public',
        })
    }

    key.value = JSON.stringify(publicKey)
    await key.save()
}

export default {
    readPrivateKey,
    writePrivateKey,
    readPublicKey,
    writePublicKey,
}
