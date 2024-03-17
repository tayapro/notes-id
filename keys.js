const keypairPem = `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAtRXzVqY51HMCh+iK2K0YmGF044P2qM/42MDBZuk6CpqUg1Vm
7ylBHLm41QWNIwvzyVtBiibjSPtT/Ua2+/6v5dz2bwZqUzxYU/yq5sacv3yfOpwe
8mYej2wyaC0fBcKSigrpFj3nDHTXEUGIiR0Vptd7ja7vjOcj/8raGjaR7zGF/5P4
2OA+UUDmRmyU1PG/d4fV+bagip1byEcPM4GSxqOnWkJdNX9da82S9QxYSofFq9t8
MYH2texM5ImcqZ0FmdUXb8k1DeBXv0dqg1ZbhaDvCzNWfgoMjhPeB5lpnCP0gR+X
/3dLJDPI1lU0ddnjepCWuh48WuImxfilaoQCcwIDAQABAoIBAQCcodr0dR2KXNyw
j/0hREAE9i8z6F4/UHyvh7MB//Q7Xc/d9c3uSmHOpfpxD7cvvFPnNC7xf4eTBgl1
B2iZeYfOLJ1gFU18p7LDGsb8jIjivLnB6W5/PsNqTS0gnP67bbxw+NT6bxrd1GZ+
v4+JAgZLZRGy0MDVwMyLoXubtt3t5RNTFxqwbfv3w7GKUEdfuSObKtCfx1fv1MWC
VW53ThNf649FvxAU7cdpZYe1/HRfvF3OiNP8ymgZCPYwkPfFuxXM82X2zpQrIptZ
f93ebrcMi7WFQwtOO3GNEoEQ6rmQhDIEShG41FJlD1aMeGq2qJbfcyrA3rT/ElQf
m59l1CVRAoGBAOs45zAlXNkwGHBTrc/MozMdXYRLbpzNvut3OcTKhJbszK0zHyp0
/K1QGnQyYEBdzKb5WnBHL69uFzf3CInWsUCjt1syXwXyl8ghpkQsbAwxv/3KF+fk
28apNw0xBt6EygP0cYKYPWiFc6c+g6goDcsVx7Idv4DFrCIRtDxxLKb5AoGBAMUU
2r11WyxrHAkoOGRmBD6cqEpA9kVzHnX+JsevlbZ2Uyvp4W6gIZeBDHJZidQoCDS+
tmoiiP2YWSuE4E0sHh7ktLqiwtDPCAZYmwY8/ZrMXguJqLoWRpxh8nzQyvkyA9kl
MeNoIQ4blEchkQkpo/xuJpqqTMcSl65bp6d7mDPLAoGBAIE/vDEFZrZkqhkWsdwL
2uUcTqWB+V6p4y1pTtHmYeK4bWMCQy7GJ41oBZExmRflMq3RODOXugkQWivDTurG
kJEvJHI1BGe1PFeYvc6aBijRMWjXojkm1OidVIWoGdktZ/+yUqjq1FtZcQpF3HwK
vkGITzl9BRxSAdqalcnceiepAoGANJVh35cGYo2Zh1/x2+fUThhiVp2Kl/ElOXo8
Qp84pNxhSKA4g9m53MCT35bATZj4x4nzBdJ9FpylfhUP+8c/qiJ/jiSLMkdq7raJ
dlqjl7/bf9yU5kG3SVZg6qiS33ZWzIM+ElzgJPF62Je+KOGxXVLOfgnePmdZjS3r
R6aUb40CgYEAzDyj6buu2joN75Hkii9g5jRWOf80gG1yHTtJauD8FsR9qqFb7XYO
3P5ZeA9Pvlno2aoUpws/pvijnBr3M3H4MRijqiXpnOzEy4idwvzgsJYpcnpwu5LF
UJ2kZ6fQ/nGw1AeXF1rJL2WGIyHV1576BPk9eBvYYFTuaOJELSozu3o=
-----END RSA PRIVATE KEY-----`

const jwks = {
    keys: [
        {
            e: 'AQAB',
            kid: 'XooolbD0BPGABjHzSDRfQ4YBg8H87zwTJVmmP8I81OA',
            kty: 'RSA',
            n: 'tRXzVqY51HMCh-iK2K0YmGF044P2qM_42MDBZuk6CpqUg1Vm7ylBHLm41QWNIwvzyVtBiibjSPtT_Ua2-_6v5dz2bwZqUzxYU_yq5sacv3yfOpwe8mYej2wyaC0fBcKSigrpFj3nDHTXEUGIiR0Vptd7ja7vjOcj_8raGjaR7zGF_5P42OA-UUDmRmyU1PG_d4fV-bagip1byEcPM4GSxqOnWkJdNX9da82S9QxYSofFq9t8MYH2texM5ImcqZ0FmdUXb8k1DeBXv0dqg1ZbhaDvCzNWfgoMjhPeB5lpnCP0gR-X_3dLJDPI1lU0ddnjepCWuh48WuImxfilaoQCcw',
            alg: 'RS256',
            use: 'sig',
        },
    ],
}

function getKeyPairPem() {
    return keypairPem
}

function getPublicJWKS() {
    return jwks
}

export default {
    getKeyPairPem,
    getPublicJWKS,
}
