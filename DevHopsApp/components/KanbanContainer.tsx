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
            {children}
        </QueryClientProvider>
    )
}