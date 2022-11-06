"use client"

import React, { useEffect, useState } from 'react'
import type { WorkItem, WorkItemStatus } from '../types'
import { useQuery } from '@tanstack/react-query'
import Draggable from 'react-draggable';

type KanbanProps = {
    workItems: WorkItem[]
}

export const Kanban = ({ workItems }: KanbanProps): React.ReactElement => {
    // const { data, refetch } = useQuery({ queryKey: ['workitem'], queryFn: fetchTasks, initialData: tasks })

    const [data, setData] = useState(workItems)

    const titles: { [key in WorkItemStatus]: string } = {
        todo: 'TODO',
        inprogress: 'In Progress',
        review: 'In Review',
        changerequested: 'Change Requested',
        done: 'Done'
    }

    const statusKeys: WorkItemStatus[] = [
        'todo',
        'inprogress',
        'changerequested',
        'review',
        'done'
    ]

    const groups: { [key in WorkItemStatus]: WorkItem[] } = {
        todo: [],
        inprogress: [],
        changerequested: [],
        review: [],
        done: []
    }

    data?.forEach((workItem) => {
        const status = getWorkItemStatus(workItem)
        console.log(status)
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

        setGridWidth(window.innerWidth / 5)
      }, [])

    return (
        <>
        {boardData.lanes.map((lane, i) => (
            <div key={`lane-${lane.id}`} className='w-full p-2 flex flex-col bg-medium rounded-sm shadow-md' style={{ height: 'calc(100vh - 30px)'}}>
                <div className='w-full mt-1 mb-2 flex flex-col justify-start items-start'>
                    <div className='w-full flex pr-2 pl-2 justify-between items-center'>
                        <h2 className='font-sans font-semibold text-md text-slate'>{titles[lane.title as WorkItemStatus]}</h2>
                        <svg width={14} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#888888" d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z"/></svg>
                    </div>
                </div>
                <div className='w-full flex-grow flex flex-col justify-start items-center'>
                {lane.cards.map((item, j) => (
                    <Draggable key={`task-card-${item.workItemId}`} grid={[gridWidth - 4, 1]} bounds={{ top: 0 }}  onStop={(e, d) => {
                        const delta = Math.round(d.lastX / gridWidth)
                        const currentIndex = statusKeys.findIndex((stat) => stat === getWorkItemStatus(item))
                        const nextIndex = currentIndex + delta

                        setData((current) => {
                            const currentStatus = statusKeys[currentIndex]
                            const nextStatus = statusKeys[nextIndex]

                            const copy = [...current]

                            const copyTask = copy.find((t) => t.workItemId === item.workItemId)

                            if (!copyTask) {
                                return current
                            }

                            if (!copyTask.statusUpdates[0]) {
                                copyTask.status = nextStatus
                                return copy
                            }

                            copyTask.statusUpdates[0].status = nextStatus

                            return copy
                        })

                    }}>
                        <div className='w-full p-2 mb-3 flex flex-col justify-start rounded-sm bg-light shadow-md'>
                            <div className='w-full flex justify-between items-center'>
                                <h3 className='font-sans text-slate'>{item.title}</h3>
                                <svg width={14} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#0CA678" d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                            </div>
                            <p className='font-sans text-sm text-slate'>{item.description}</p>
                            <div className='w-full mt-2 mb-2 flex justify-start items-center'>
                                <img src={`/${item.assignee.toLowerCase()}.png`} width={24} className='rounded-full mr-2' />
                                <p className='font-sans text-slate text-xs font-semibold'>{item.assignee}</p>
                            </div>
                            {!!getFirstWorkItemImage(item) ? (<div className='w-full h-36 rounded-md bg-medium'>
                            <img src={`data:image/png;base64,${getFirstWorkItemImage(item)}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                            </div>) : null}
                            <div className='w-full flex justify-start items-center'>
                                <button className='mt-1 p-2 flex justify-start items-center rounded-md hover:bg-medium' onClick={(e) => {
                                    // Show comments
                                }}>
                                    <svg height={14} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#333333" d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z"/></svg>
                                    <p className="ml-2 font-sans text-xs text-slate">{item.statusUpdates.length}</p>
                                </button>
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

const getWorkItemStatus = (item: WorkItem): WorkItemStatus => {
    return item.statusUpdates.find((update) => !!update.status)?.status ?? item.status ?? 'todo'
}

const getFirstWorkItemImage = (item: WorkItem): string | null => {
    return item.statusUpdates.find((update) => !!update.image)?.image?.imageData ?? null
}