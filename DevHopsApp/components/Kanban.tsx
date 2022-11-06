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

    const titles: { [key in Task['status']]: string } = {
        todo: 'TODO',
        inprogress: 'In Progress',
        review: 'In Review',
        changerequested: 'Change Requested',
        done: 'Done'
    }

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

    return (
        <>
        {boardData.lanes.map((lane, i) => (
            <div key={`lane-${lane.id}`} className='w-full h-full flex flex-col bg-light rounded-md overflow-hidden shadow-md'>
                <div className='w-full pl-4 pr-4 h-24 flex flex-col justify-start items-start'>
                    <div className={`w-full h-1 mt-6 pl-4 pr-4 rounded-full bg-brand ${opacities[i]}`} />
                    <div className="w-full mt-2 flex justify-center items-center">
                        {/* <div className={`w-6 h-6 mr-3 rounded-sm flex items-center justify-center`}>
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M64 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V32C0 14.3 14.3 0 32 0S64 14.3 64 32zm40.8 302.8c-3 .9-6 1.7-8.8 2.6V13.5C121.5 6.4 153 0 184 0c36.5 0 68.3 9.1 95.6 16.9l1.3 .4C309.4 25.4 333.3 32 360 32c26.8 0 52.9-6.8 73-14.1c9.9-3.6 17.9-7.2 23.4-9.8c2.7-1.3 4.8-2.4 6.2-3.1c.7-.4 1.1-.6 1.4-.8l.2-.1c9.9-5.6 22.1-5.6 31.9 .2S512 20.6 512 32V288c0 12.1-6.8 23.2-17.7 28.6L480 288c14.3 28.6 14.3 28.6 14.3 28.6l0 0 0 0-.1 0-.2 .1-.7 .4c-.6 .3-1.5 .7-2.5 1.2c-2.2 1-5.2 2.4-9 4c-7.7 3.3-18.5 7.6-31.5 11.9C424.5 342.9 388.8 352 352 352c-37 0-65.2-9.4-89-17.3l-1-.3c-24-8-43.7-14.4-70-14.4c-27.5 0-60.1 7-87.2 14.8z"/></svg>
                        </div> */}
                        <h2 className='font-sans font-semibold text-lg text-slate'>{titles[lane.title  as Task['status']]}</h2>
                    </div>
                    <div className={`w-full h-1 mt-2 pl-4 pr-4 rounded-full bg-brand ${opacities[i]}`} />
                </div>
                <div className='w-full flex-grow pl-4 pr-4 flex flex-col justify-start items-center'>
                {lane.cards.map((card, j) => (
                    <div key={`task-card-${card.id}`} className='w-full p-4 rounded-md bg-slate shadow-sm'>
                        {card.title}
                    </div>
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