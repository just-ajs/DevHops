import React from 'react'
import type { WorkItemStatus } from '../types'

type StatusDotProps = {
    status: WorkItemStatus
    size: 'lg' | 'sm'
}

export const StatusDot = ({ status, size }: StatusDotProps): React.ReactElement => {
    const colors: { [key in WorkItemStatus]: string } = {
        'todo': '#F6DCAC',
        'inprogress': '#EDB023',
        'changerequested': '#E5732C',
        'review': '#E03B31',
        'done': '#259FA4'
    }

    return (
        <div className={`${ size === 'lg' ? 'w-4 h-4' : 'w-3 h-3' } rounded-full`} style={{ backgroundColor: colors[status] }} />
    )
}