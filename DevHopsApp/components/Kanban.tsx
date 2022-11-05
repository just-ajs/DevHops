"use client"

import React, { useEffect, useState } from 'react'
import Board from 'react-trello'
import type { Task } from '../types'

type KanbanProps = {
    tasks: Task[]
}

export const Kanban = ({ tasks }: KanbanProps): React.ReactElement => {
    const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

    return <Board data={} />
}