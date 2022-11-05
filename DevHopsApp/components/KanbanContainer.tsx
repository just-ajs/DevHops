"use client"

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type KanbanContainerProps = {
    children: React.ReactNode
}

const queryClient = new QueryClient()

export const KanbanContainer = ({ children }: KanbanContainerProps): React.ReactElement => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='w-full h-full p-5 grid gap-5' style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr'}}>
                {children}
            </div>
        </QueryClientProvider>
    )
}