export interface StoreState {
    books: Book[],
    user: String
}

export interface ActionPayload {
    type: String,
    payload?: any
}

export interface Book {
    id: number,
    title: String,
    author: String,
    price: number,
    publishedOn: String
}
export interface Books {
    books: Book[]
}
