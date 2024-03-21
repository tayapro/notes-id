import parser from 'cron-parser'
import cron from 'node-cron'
import { generateKeys } from './generate.js'
import { writeKeys, readKeys } from './store.js'

const keyLength = parseInt(process.env.KEY_LENGTH) || 4096

async function startRotationJob(cronSchedule) {
    let currentKeys = null
    try {
        currentKeys = await readKeys()
    } catch (e) {
        const key = generateKeys(keyLength)
        await writeKeys(key.privateKey, key.publicKey)
        return startRotationJob(cronSchedule)
    }

    const age = Date.now() - currentKeys.lastUpdate
    const parsedCron = parser.parseExpression(cronSchedule)
    const interval = parsedCron.next().toDate() - parsedCron.prev().toDate()
    const wait = interval - age
    if (wait <= 0) {
        console.log('Rotating keys on start...', new Date())
        rotateKeys()
    }

    cron.schedule(cronSchedule, async function () {
        console.log('Rotating keys on schedule...', new Date())
        rotateKeys()
    })
}

async function rotateKeys() {
    const currentKeys = await readKeys()

    const newKey = generateKeys(keyLength)

    // Preserve public keys history and limit keys numbers by two
    newKey.publicKey.keys = newKey.publicKey.keys
        .concat(currentKeys.publicKey.keys)
        .slice(0, 2)

    await writeKeys(newKey.privateKey, newKey.publicKey)

    return newKey
}

export { startRotationJob }
export default { startRotationJob }
