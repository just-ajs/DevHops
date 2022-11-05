import React from 'react'
import { fetchTasks } from '../api'
import { Kanban, KanbanContainer } from '../components'

const Page = async (): Promise<React.ReactElement> => {
    const tasks = await fetchTasks()

    return <KanbanContainer><Kanban tasks={tasks} /></KanbanContainer>
}

export default Page