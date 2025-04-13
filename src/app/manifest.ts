import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Snippify',
        short_name: 'Snippify',
        description: 'Snippet Hub',
        start_url: '/',
        lang: "en-US",
        orientation: "landscape-primary",
        display: "fullscreen",
        background_color: '#151515',
        theme_color: '#cecece',
        icons: [
            {
                src: './favicon.png',
                sizes: '500x500',
                type: 'image/png',
            },
            {
                src: './icon32.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: './icon64.png',
                sizes: '64x64',
                type: 'image/png',
            },
            {
                src: './icon128.png',
                sizes: '128x128',
                type: 'image/png',
            },
            {
                src: './icon256.png',
                sizes: '256x256',
                type: 'image/png',
            },
            {
                src: './icon144.png',
                sizes: '144x144',
                type: 'image/png',
            },
        ],
    }
}