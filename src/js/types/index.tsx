export interface StoreState {
    books: Book[],
    user: String,
    pageActive: String
}

export interface ActionPayload {
    type: String,
    payload?: any
}

export interface Book {
    isbn: String,
    title: String,
    subtitle: String,
    author: String,
    published: String,
    publisher: String,
    pages: number,
    description?: String,
    website?: String
}
export interface Books {
    books: Book[]
}
