const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const jwktopem = require('jwk-to-pem')
const morgan = require('morgan')
require('dotenv').config()
const keys = require('./keys.js')
const User = require('./models/user.js')

const port = 3001
const app = express()
//in order to parse POST JSON
app.use(express.json())

app.use(
    cors({
        origin: process.env.CORS_ALLOWED_ORIGINS
            ? process.env.CORS_ALLOWED_ORIGINS.split(' ')
            : '*',
        credentials: true,
    })
)

// to log requests
app.use(morgan('combined'))

mongoose.connect(process.env.MONGO_URL).catch(function (err) {
    console.log(err)
})

app.listen(port, function () {
    console.log(`...Server started on port ${port}...`)
})

app.get('/.well-known/jwks.json', function (req, res) {
    res.status(200).json(keys.jwks)
})

app.get('/ping', async function (req, res) {
    res.status(200).send()
})

app.post('/api/register', async function (req, res) {
    try {
        const { username, password } = req.body

        const user = new User({
            username: username,
            password: password,
        })
        const { id } = await user.save()

        const tokens = issueTokens(username, id)
        return res.status(200).json({
            username: username,
            user_id: id,
            refreshToken: tokens.refresh_token,
            accessToken: tokens.access_token,
        })
    } catch (e) {
        console.error('ERROR :::', e)
        return res.status(400).send(e.message)
    }
})

app.post('/api/login', async function (req, res) {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username: username })
        if (!user || user.password !== password) {
            return res.status(400).send()
        }
        const tokens = issueTokens(username, user.id)
        return res.status(200).json({
            username: user.username,
            user_id: user.id,
            refreshToken: tokens.refresh_token,
            accessToken: tokens.access_token,
        })
    } catch (e) {
        console.error('ERROR :::', e)
        return res.status(400).send(e.message)
    }
})

app.post('/api/refresh', function (req, res) {
    try {
        const decoded_token = verifyToken(req.body.refreshToken)
        if (decoded_token.token_use !== 'refresh') {
            throw new Error('Bad token use')
        }
        const tokens = issueTokens(
            decoded_token.username,
            decoded_token.user_id
        )
        return res.status(200).json({
            username: decoded_token.username,
            user_id: decoded_token.user_id,
            refreshToken: tokens.refresh_token,
            accessToken: tokens.access_token,
        })
    } catch (e) {
        console.error('ERROR :::', e)
        return res.status(400).send(e.message)
    }
})

app.post('/api/logout', function (req, res) {
    res.status(200).send()
})

function issueTokens(username, userID) {
    const access_token = jwt.sign(
        {
            username: username,
            user_id: userID,
            token_use: 'access',
        },
        keys.keypairPem,
        {
            algorithm: 'RS256',
            expiresIn: '60m',
            keyid: keys.jwks.keys[0].kid,
        }
    )

    const refresh_token = jwt.sign(
        {
            username: username,
            user_id: userID,
            token_use: 'refresh',
        },
        keys.keypairPem,
        {
            algorithm: 'RS256',
            expiresIn: '30d',
            keyid: keys.jwks.keys[0].kid,
        }
    )

    return {
        refresh_token: refresh_token,
        access_token: access_token,
    }
}

function verifyToken(token) {
    const key = jwktopem(keys.jwks.keys[0])
    const decoded_token = jwt.verify(token, key)
    return decoded_token
}
