import {Context} from 'hono';

const mockBlogPosts = [
    { id: 1, title: 'Welcome to the blog' },
    { id: 2, title: 'Using HTMX with Deno' }
]

export const getPosts = (c: Context) => {
    const htmlStr = mockBlogPosts.map(p =>
        `<div><a href="/posts/${p.id}">${p.title}</a></div>`
    ).join('')

    return c.html(htmlStr)
}