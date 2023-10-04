/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'http://127.0.0.1:1337/'
        ],
        remotePatterns: [{
            protocol: 'http',
            hostname: '127.0.0.1',
            port: '1337',
            pathname: '/uploads/**'
        }]
    },
    
}



module.exports = nextConfig
