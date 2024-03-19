import parser from 'cron-parser'
import cron from 'node-cron'
import { generateKeys } from './generate.js'
import { writeKeys, readKeys } from './store.js'

async function startRotationJob(cronSchedule) {
    let currentKeys = null
    try {
        currentKeys = await readKeys()
    } catch (e) {
        const key = generateKeys(2048)
        await writeKeys(key.privateKeyPem, key.jwks)
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
    console.log('Wait: ', wait, new Date())
    cron.schedule(cronSchedule, async function () {
        console.log('Rotating keys on schedule...', new Date())
        rotateKeys()
    })
}

async function rotateKeys() {
    const currentKeys = await readKeys()

    const newKey = generateKeys(2048)

    // Preserve public keys history
    newKey.jwks.keys = newKey.jwks.keys
        .concat(currentKeys.public.keys)
        .slice(0, 2)
    console.log(newKey.jwks.keys)

    await writeKeys(newKey.privateKeyPem, newKey.jwks)

    return newKey
}

export { startRotationJob }

export default { startRotationJob }
