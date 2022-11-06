"use client"

import React, { useEffect, useState } from 'react'
import type { Task } from '../types'
import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from '../api'
import Draggable from 'react-draggable';

type KanbanProps = {
    tasks: Task[]
}

export const Kanban = ({ tasks }: KanbanProps): React.ReactElement => {
    // const { data, refetch } = useQuery({ queryKey: ['workitem'], queryFn: fetchTasks, initialData: tasks })

    const [data, setData] = useState(tasks)

    const titles: { [key in Task['status']]: string } = {
        todo: 'TODO',
        inprogress: 'In Progress',
        review: 'In Review',
        changerequested: 'Change Requested',
        done: 'Done'
    }

    const statusKeys: Task['status'][] = [
        'todo',
        'inprogress',
        'review',
        'changerequested',
        'done'
    ]

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

      const opacities = [
        'bg-opacity-20',
        'bg-opacity-40',
        'bg-opacity-60',
        'bg-opacity-80',
        'bg-opacity-100'
      ]

      const [gridWidth, setGridWidth] = useState(0)

      useEffect(() => {
        if (!window) {
            return
        }

        setGridWidth(window.innerWidth / 5)
      }, [])

    return (
        <>
        {boardData.lanes.map((lane, i) => (
            <div key={`lane-${lane.id}`} className='w-full h-full p-2 flex flex-col bg-medium rounded-sm shadow-md'>
                <div className='w-full mt-1 mb-2 flex flex-col justify-start items-start'>
                    <div className='w-full flex pr-2 pl-2 justify-between items-center'>
                        <h2 className='font-sans font-semibold text-md text-slate'>{titles[lane.title  as Task['status']]}</h2>
                        <svg width={14} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#888888" d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z"/></svg>
                    </div>
                </div>
                <div className='w-full flex-grow flex flex-col justify-start items-center'>
                {lane.cards.map((card, j) => (
                    <Draggable key={`task-card-${card.id}`} grid={[gridWidth - 4, 1]} bounds={{ top: 0 }}  onStop={(e, d) => {
                        const delta = Math.round(d.lastX / gridWidth)
                        const currentIndex = statusKeys.findIndex((stat) => stat === card.status)
                        const nextIndex = currentIndex + delta

                        setData((current) => {
                            const currentStatus = statusKeys[currentIndex]
                            const nextStatus = statusKeys[nextIndex]

                            const copy = [...current]

                            const copyTask = copy.find((t) => t.id.toString() === card.id)

                            if (!copyTask) {
                                return current
                            }

                            copyTask.status = nextStatus

                            return copy
                        })

                    }}>
                        <div className='w-full p-2 mb-3 flex flex-col justify-start rounded-sm bg-light shadow-md'>
                            <div className='w-full flex justify-start items-center'>
                                <h3 className='font-sans text-slate'>{card.title}</h3>
                                <p className='font-sans text-sm text-slate'>{card.description}</p>
                            </div>

                        </div>
                    </Draggable>
                ))}
                </div>

            </div>
        ))}
        </>
    )
}

type Card = {
    id: string
    title: string
    status: Task['status']
    description: string
    label: string
}

const taskToCard = (task: Task): Card => {
    return {
        id: task.id.toString(),
        title: task.title,
        status: task.status,
        description: '',
        label: task.title
    }
}