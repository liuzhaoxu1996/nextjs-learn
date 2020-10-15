const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const client_id = '8079e3ee0c779f71f206'

module.exports = {
    github: {
        client_secret: '18553a5c1877d88dd9c61e28e9a5d797e7e9c33c',
        client_id,
        request_token_url: 'https://github.com/login/oauth/access_token'
    },
    GITHUB_OAUTH_URL,
    OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`
}