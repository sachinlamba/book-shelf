export interface StoreState {
    books: Book[],
    user: string,
    pageActive: string,
    openBook: Book | string,
    reload: boolean,
    popupShow: boolean,
    popupMessage: string
}

export interface ActionPayload {
    type: string,
    payload?: any
}

export interface Book {
    isbn: string,
    title: string,
    subtitle: string,
    author: string,
    published: string,
    publisher: string,
    pages: number,
    description?: string,
    website?: string
}
export interface Books {
    books: Book[]
}
