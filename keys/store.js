import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    privateKey: {
        type: String,
        required: true,
    },
    publicKey: {
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

// This function read publicKey and privateKey from DB
// and return privateKey as PEM string and publicKey as JWKS object
async function readKeys() {
    const keys = await Key.findOne({ type: 'keypair' })
    if (!keys) {
        throw new Error('Key is not found')
    }

    return {
        privateKey: keys.privateKey,
        publicKey: JSON.parse(keys.publicKey),
        lastUpdate: keys.lastUpdate,
    }
}

// This function takes privateKey as a PEM string and
// public key as JWKS object and stores it in DB
async function writeKeys(privateKey, publicKey) {
    let key = await Key.findOne({ type: 'keypair' })

    if (!key) {
        key = new Key({
            type: 'keypair',
        })
    }

    key.lastUpdate = Date.now()
    key.privateKey = privateKey
    key.publicKey = JSON.stringify(publicKey)
    await key.save()
}

export { writeKeys, readKeys }
export default {
    writeKeys,
    readKeys,
}
