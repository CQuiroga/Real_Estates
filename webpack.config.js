import path from 'path';

export default {
    mode: 'development',
    entry: {
        map: './src/js/map.js',
        addImage: './src/js/addImage.js',
        showMap: './src/js/showMap.js',
        homeMap: './src/js/homeMap.js',

    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}