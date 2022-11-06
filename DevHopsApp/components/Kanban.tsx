"use client"

import React, { useEffect, useRef, useState } from 'react'
import type { WorkItem, WorkItemStatus, StatusUpdate } from '../types'
import { useQuery } from '@tanstack/react-query'
import Draggable from 'react-draggable';
import { KanbanCard } from './KanbanCard';
import { StatusDot } from './StatusDot';
import { fetchWorkItems } from '../api'

type KanbanProps = {
    workItems: WorkItem[]
    onOpenUpdate: (updates: StatusUpdate[]) => void
}

export const Kanban = ({ workItems, onOpenUpdate }: KanbanProps): React.ReactElement => {
    const { data, refetch } = useQuery({ queryKey: ['workitem'], queryFn: fetchWorkItems, initialData: workItems, retry: 1, refetchInterval: 5000, refetchOnMount: false, refetchOnWindowFocus: false })

    // const isPosted = useRef(false)
    // useEffect(() => {
    //     if (data.length < 0 || isPosted.current) {
    //         return
    //     }

    //     const requests = data.map((item) => fetch('http://localhost:5296/api/WorkItems', { method: 'POST', body: JSON.stringify(item), headers: { 'Content-Type': 'application/json' } }))

    //     Promise.all(requests)

    //     refetch()

    //     isPosted.current = true
    // }, [data])

    const titles: { [key in WorkItemStatus]: string } = {
        todo: 'TODO',
        inprogress: 'In Progress',
        review: 'In Review',
        changerequested: 'Change Requested',
        done: 'Done'
    }

    const groups: { [key in WorkItemStatus]: WorkItem[] } = {
        todo: [],
        inprogress: [],
        changerequested: [],
        review: [],
        done: []
    }

    data?.forEach((workItem) => {
        const status = getWorkItemStatus(workItem)
        groups[status].push(workItem)
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

      const [gridWidth, setGridWidth] = useState(0)

      useEffect(() => {
        if (!window) {
            return
        }

        refetch()
        setGridWidth(window.innerWidth / 5)
      }, [])

    return (
        <>
        {boardData.lanes.map((lane, i) => (
            <div key={`lane-${lane.id}`} className='w-full p-2 flex flex-col bg-medium rounded-sm shadow-md'>
                <div className='w-full mt-1 mb-2 flex flex-col justify-start items-start'>
                    <div className='w-full flex pr-2 pl-2 justify-start items-center'>
                        <StatusDot status={lane.title as any} size="lg" />
                        <h2 className='ml-2 font-sans font-semibold text-md text-slate flex-grow'>{titles[lane.title as WorkItemStatus]}</h2>
                        <svg width={14} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#888888" d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z"/></svg>
                    </div>
                </div>
                <div className='w-full flex-grow flex flex-col justify-start items-center'>
                {lane.cards.map((item, j) => (
                    <KanbanCard  key={`task-card-${item.workItemId}`} item={item} gridWidth={gridWidth} onUpdateData={() => {
                        refetch()
                    }} />
                ))}
                </div>

            </div>
        ))}
        </>
    )
}

const getWorkItemStatus = (item: WorkItem): WorkItemStatus => {
    return item.status ?? item.statusUpdates.find((update) => !!update.status)?.status ?? 'todo'
}

const getFirstWorkItemImage = (item: WorkItem): string | null => {
    return item.statusUpdates.find((update) => !!update.image)?.image?.imageData ?? null
}