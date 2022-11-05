"use client"

import React, { use } from 'react'
import { fetchTasks } from '../../api'
import { KanbanContainer, Kanban } from '../../components'

const Page = (): React.ReactElement => {
    const tasks = use(fetchTasks())

    return <Kanban tasks={tasks} />
}

export default Page