"use client"

import React from 'react'
import Image from 'next/image'


type KanbanContainerProps = {
    children: React.ReactNode
}



export const KanbanContainer = ({ children }: KanbanContainerProps): React.ReactElement => {
    return (

            <div className='w-full h-full flex flex-col justify-start items-center'>
                <div className='w-full pl-5 pt-2 pb-2 h-14 flex justify-start items-center bg-light bg-opacity-30'>
                    <Image src="/dev-hops-square.svg" alt="DevHops logo" width={50} height={25} />
                    <h1 className='ml-2 font-sans text-2xl text-brand font-semibold'>DevHops Kanban Board</h1>
                </div>
                <div className='w-full flex-grow p-5 grid gap-5' style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr'}}>
                    {children}
                </div>
            </div>

    )
}