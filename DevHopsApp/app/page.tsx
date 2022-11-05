import React from 'react'
import { fetchTasks } from '../api'
import { Kanban } from '../components'

const Page = async (): Promise<React.ReactElement> => {
    const tasks = await fetchTasks()

    return <Kanban tasks={tasks} />
}

export default Page