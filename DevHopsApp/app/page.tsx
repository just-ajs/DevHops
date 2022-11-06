import React from 'react'
import '../globals.css'
import { fetchTasks } from '../api'
import { Kanban, KanbanContainer } from '../components'

const Page = async (): Promise<React.ReactElement> => {
    const tasks = await fetchTasks()

    return (
        <div id="root" className='w-vw h-vh bg-brand bg-opacity-30'>
            <KanbanContainer>
                <Kanban tasks={tasks} />
            </KanbanContainer>
        </div>
    )
}

export default Page