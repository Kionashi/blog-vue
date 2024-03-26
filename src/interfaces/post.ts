export interface Post {
    id: Number, 
    title: String, 
    body: String,
    author: {
        id: Number,
        name: String,
        username: String,
        email: String,
        phone: String
    }
}