export type WorkItem = {
    workItemId: string,
    title: string,
    test: "passed" | "failed" | string,
    description: string,
    assignee: string,
    status?: WorkItemStatus
    statusUpdates: StatusUpdate[]
}

export type WorkItemStatus = 'todo' | 'inprogress' | 'review' | 'changerequested' | 'done' | string

export type StatusUpdate = {
    statusUpdateId: string,
    updateTime: string,
    status: WorkItemStatus,
    comment?: string
    image?: {
        id: number,
        imageTitle: string
        imageData: string
    }
}