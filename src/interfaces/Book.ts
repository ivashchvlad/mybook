export default interface Book {
    "@uri": string,
    authorweb: string,
    titles: {
        isbn: isbn[]
    },
    onsaledate: string,
    titleAuth: string,
    titleSubtitleAuth: string,
    titleshort: string,
    titleweb: string,
    workid: string,
}

interface isbn {
    "@formatcode": string,
    "$": string,
}