export type Task = {
    id: number
    title: string
    username: string
    status: 'todo' | 'inprogress' | 'review' | 'changerequested' | 'done'
    comments: string[]
    images: string[]
}