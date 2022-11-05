"use client"

import React, { useEffect, useState } from 'react'
import type { Task } from '../types'
import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from '../api'

type KanbanProps = {
    tasks: Task[]
}

export const Kanban = ({ tasks }: KanbanProps): React.ReactElement => {
    const { data } = useQuery({ queryKey: ['workitem'], queryFn: fetchTasks, initialData: tasks })

    const groups: { [key in Task['status']]: Card[] } = {
        todo: [],
        inprogress: [],
        review: [],
        changerequested: [],
        done: []
    }

    data?.forEach((task) => {
        const { status } = task
        groups[status].push(taskToCard(task))
    })

    const laneData = Object.entries(groups).map((([group, cards]) => {
        return {
            id: `${group}-id`,
            title: group,
            label: '-',
            cards,
        }
    }))

    const boardData = {
        lanes: laneData
      }

    return (
        <>
        {boardData.lanes.map((lane) => (
            <div key={`lane-${lane.id}`} className='w-full h-full flex bg-light rounded-md shadow-sm'>
                {lane.id}
            </div>
        ))}
        </>
    )
}

type Card = {
    id: string
    title: string
    description: string
    label: string
}

const taskToCard = (task: Task): Card => {
    return {
        id: task.id.toString(),
        title: task.title,
        description: '',
        label: task.title
    }
}