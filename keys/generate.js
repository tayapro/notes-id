import { generateKeyPairSync, createHash } from 'node:crypto'
import { pem2jwk } from 'pem-jwk'

function getKid(publicKey) {
    return createHash('sha256').update(publicKey).digest('hex')
}

function generateKeys(keyLength) {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: keyLength,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    })

    const jwk = {
        ...pem2jwk(publicKey),
        kid: getKid(publicKey),
        alg: 'RS256',
        use: 'sig',
    }
    const jwks = {
        keys: [jwk],
    }

    return {
        privateKey,
        publicKey: jwks,
    }
}

export { generateKeys }

export default {
    generateKeys,
}
