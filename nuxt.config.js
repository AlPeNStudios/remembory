export default {
    plugins: [
        { ssr: false, src: '~plugins/nuxtClientInit' }
    ],

    buildModules: [
        '@nuxtjs/pwa',
    ],

    pwa: {
        meta: {
            name: 'Remembory',
            description: 'Simple memory training app',
            theme_color: '#fcba03',
            lang: 'de'
        },
        manifest: {
            name: 'Remembory',
            lang: 'de'
        }
    }

}