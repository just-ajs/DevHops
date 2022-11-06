export type WorkItem = {
    id: string,
    title: string,
    testpassed: boolean,
    description: string,
    assignee: string,
    statusUpdates: StatusUpdate[]
}

export type WorkItemStatus = 'todo' | 'inprogress' | 'review' | 'changerequested' | 'done'

export type StatusUpdate = {
    id: string,
    timestamp: string,
    username: string,
    status: WorkItemStatus,
    comment?: string
    image?: string
}