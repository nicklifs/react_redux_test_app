var Promise = require('es6-promise').Promise;

const fakeDB = {
    favs: [{
        title: 'google1',
        price_formatted: '$0',
        'thumb_url': 'https://www.google.by/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png'
    }, {
        title: 'google2',
        price_formatted: '$20',
        'thumb_url': 'https://www.google.by/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png'
    }, {
        title: 'google3',
        price_formatted: '$300',
        'thumb_url': 'https://www.google.by/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png'
    }]
}

const delay = (ms) => new Promise(
    resolve => setTimeout(resolve, ms)
)

export const fetchFavs = () => {
    return delay(2500).then(() => {
        return fakeDB.favs;
    })
}