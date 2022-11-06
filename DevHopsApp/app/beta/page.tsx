"use client"

import React, { use, useState, useCallback } from 'react'
import Image from 'next/image'
import '../../globals.css'
import { fetchWorkItems } from '../../api'
import { Kanban, KanbanContainer } from '../../components'
import { StatusUpdate } from '../../types'

const Page = (): React.ReactElement => {
    const workItems = use(fetchWorkItems())

    const [updates, setUpdates] = useState<StatusUpdate[]>([])

    const handleSetStatusUpdates = useCallback((updates: StatusUpdate[]) => {
        setUpdates(updates)
    }, [])

    return (
        <div id="root" className='w-vw h-vh relative' style={{ backgroundImage: 'groovy.png' }}>
            <div className='w-vw h-vh absolute left-0 top-0 z-0'>
                <Image src={'/groovy.png'} alt="groovy background" layout="fill" />
            </div>
            <div className='w-vw h-vh absolute left-0 top-0 z-10'>
                <KanbanContainer>
                    <Kanban workItems={workItems} onOpenUpdate={handleSetStatusUpdates} />
                </KanbanContainer>
            </div>
            {updates.length > 0 ? (
                <div className='w-vw h-vh absolute left-0 top-0 z-20'>
                    <div className='w-full h-full flex justify-center items-center'>
                        <div className='w-96 p-4 bg-light rounded-sm shadow-lg'>
                            <button onClick={() => setUpdates([])}>OK</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Page