import React, { useEffect, useRef, useState} from 'react'
import Draggable from 'react-draggable'
import type { StatusUpdate, WorkItem, WorkItemStatus } from '../types'
import { StatusDot } from './StatusDot'
import { postStatusUpdate, putWorkItem } from '../api'

type KanbanCardProps = {
    item: WorkItem
    gridWidth: number
    onUpdateData: () => void
}

export const KanbanCard = ({ item, gridWidth, onUpdateData }: KanbanCardProps): React.ReactElement => {

    const [ showComments, setShowComments ] = useState(item.statusUpdates.length > 0)
    const cardRef = useRef<HTMLDivElement>(null)
    const textInput = useRef<HTMLInputElement>(null)

    const internalItem = useRef(item)

    useEffect(() => {
        internalItem.current = item
    }, [item])

    const statusKeys: WorkItemStatus[] = [
        'todo',
        'inprogress',
        'changerequested',
        'review',
        'done'
    ]

    return (
        <Draggable nodeRef={cardRef} cancel='no-drag' grid={[gridWidth - 4, 1]} bounds={{ top: 0 }}  onStop={(e, d) => {
            const delta = Math.round(d.lastX / gridWidth)
            const currentIndex = statusKeys.findIndex((stat) => stat === getWorkItemStatus(item))
            const nextIndex = currentIndex + delta

            const nextStatus = statusKeys[nextIndex]

            internalItem.current.status = nextStatus

            console.log(nextStatus)

            const now = new Date()

            const nextStatusUpdate: StatusUpdate = {
                statusUpdateId: crypto.randomUUID(),
                    status: nextStatus,
                    updateTime: now.toISOString(),
                    comment: textInput.current?.value
            }

            if (nextStatusUpdate.comment) {
                postStatusUpdate(item.workItemId, nextStatusUpdate)
            .then(() => {
                return putWorkItem(internalItem.current)
            })
            .then(() => {
                onUpdateData()
            })
            } else {
                putWorkItem(internalItem.current).then(() => {
                    onUpdateData()
                })
            }



            // onUpdateData((current: WorkItem[]) => {
            //     const currentStatus = statusKeys[currentIndex]


            //     const copy = [...current]

            //     const copyTask = copy.find((t) => t.workItemId === item.workItemId)

            //     if (!copyTask) {
            //         return current
            //     }

            //     if (!copyTask.statusUpdates[0]) {
            //         copyTask.status = nextStatus
            //         return copy
            //     }

            //     copyTask.statusUpdates[0].status = nextStatus

            //     return copy
            // })

        }}>
            <div ref={cardRef} className='w-full p-2 mb-3 flex flex-col justify-start rounded-sm bg-light shadow-md'>
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
                <div className='w-full flex justify-between items-center'>
                    <button className='no-drag mt-1 p-2 flex justify-start items-center rounded-md hover:bg-medium' onClick={() => setShowComments((status) => !status)}>
                        <svg height={14} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#333333" d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z"/></svg>
                        <p className="ml-2 font-sans text-xs text-slate">{item.statusUpdates.length}</p>
                    </button>
                    <p className='font-sans text-xs text-slate opacity-50'>{item.workItemId.split('-')?.[0]}</p>
                </div>
                {showComments ? (
                    <div className='w-full flex flex-col justify-start items-center'>
                        {item.statusUpdates.sort((a, b) => (a.updateTime < b.updateTime) ? -1 : ((a.updateTime > b.updateTime) ? 1 : 0)).map((status) => (
                            <div key={`status-update-${status.statusUpdateId}-${status.updateTime}`} className='w-full mb-1 flex justify-start items-center'>
                                <div className='ml-2 mr-2'>
                                <StatusDot status={status.status} size='sm' />
                                    </div>
                                    <p className="font-sans text-xs text-slate whitespace-nowrap overflow-hidden">{status?.comment?.substring(0, 30) ?? status.status}</p>
                            </div>
                        ))}
                        <form className='w-full' onSubmit={(e) => {
                            e.preventDefault()

                            if (!textInput.current) {
                                return
                            }

                            console.log(textInput.current.value)
                        }}>
                        <input ref={textInput} className='mt-1 h-8 pl-2 pr-2 w-full bg-medium rounded-md font-sans text-md text-slate' placeholder={"Submit a new comment..."} type="text" />
                        </form>
                    </div>
                ) : null}
            </div>
        </Draggable>
    )
}

const getWorkItemStatus = (item: WorkItem): WorkItemStatus => {
    return  item.statusUpdates.sort((a, b) => (a.updateTime < b.updateTime) ? -1 : ((a.updateTime > b.updateTime) ? 1 : 0)).reverse().find((update) => !!update.status)?.status ?? item.status ?? 'todo'
}

const getFirstWorkItemImage = (item: WorkItem): string | null => {
    return item.statusUpdates.sort((a, b) => (a.updateTime < b.updateTime) ? -1 : ((a.updateTime > b.updateTime) ? 1 : 0)).reverse().find((update) => !!update.image)?.image?.imageData ?? null
}