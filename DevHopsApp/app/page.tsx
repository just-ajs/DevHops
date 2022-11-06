import React from 'react'
import Image from 'next/image'
import '../globals.css'
import { fetchWorkItems } from '../api'
import { Kanban, KanbanContainer } from '../components'

const Page = async (): Promise<React.ReactElement> => {
    const workItems = await fetchWorkItems()

    return (
        <div id="root" className='w-vw h-vh relative' style={{ backgroundImage: 'groovy.png' }}>
            <div className='w-vw h-vh absolute left-0 top-0 z-0'>
                <Image src={'/groovy.png'} alt="groovy background" layout="fill" />
            </div>
            <div className='w-vw h-vh absolute left-0 top-0 z-10'>
                <KanbanContainer>
                    <Kanban workItems={workItems} />
                </KanbanContainer>
            </div>
        </div>
    )
}

export default Page