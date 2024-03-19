import { generateKeyPairSync, createHash } from 'crypto'
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
        privateKeyPem: privateKey,
        jwks,
    }
}

export { generateKeys }

export default {
    generateKeys,
}
