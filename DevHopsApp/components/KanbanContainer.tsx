"use client"

import React from 'react'
import Image from 'next/image'


type KanbanContainerProps = {
    children: React.ReactNode
}



export const KanbanContainer = ({ children }: KanbanContainerProps): React.ReactElement => {
    return (

            <div className='w-full h-full flex flex-col justify-start items-center'>
                <div className='w-full h-12 flex justify-start items-center'>
                    {/* <Image src="/dev-hops-logo.png" alt="DevHops logo" width={50} height={25} /> */}
                </div>
                <div className='w-full flex-grow p-5 grid gap-5' style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr'}}>
                    {children}
                </div>
            </div>

    )
}