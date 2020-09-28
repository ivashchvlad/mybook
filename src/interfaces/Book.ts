export default interface Book {
    "@uri": string,
    author: string,
    authors: Authors,
    authorbio: string,
    awards: string,
    characters: string,
    contributorfirst1: string,
    contributorlast1: string,
    division: string,
    flapcopy: string,
    formatcode: string,
    formatname: string,
    imprint: string,
    isbn: string,
    isbn10: string,
    isbn10hyphenated: string,
    isbn13hyphenated: string,
    authorweb: string,
    title: string,
    onsaledate: string,
    keyword: string,
    pages:string,
    pricecanada: string,
    priceusa: string,
    "relatedisbns": {
        "isbn": {
            "@formatcode": "TR",
            "$": "9780141180632"
        }
    },
    salestatus: string,
    subjectcategory1: string,
    subjectcategory2: string,
    subjectcategory3: string,
    subjectcategorydescription1: string,
    subjectcategorydescription2: string,
    subjectcategorydescription3: string,
    tgpdf: string,
    themes: string,
    titleauthisbn: string,
    titleshort: string,
    titlesubtitleauthisbn: string,
    titleweb: string,
    updatedOn: string,
    webdomains: Object,
    links: string,
    workid: string,
}

interface Authors {
    authorId: {
        "@contributortype": string,
        "$": string,
    }
}