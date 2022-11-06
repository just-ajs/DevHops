import type { WorkItem } from '../types'

export const putWorkItem = async (item: WorkItem): Promise<void> => {
    const response = await fetch(`http://localhost:5296/api/WorkItems/${item.workItemId}`, { method: 'PUT', body: JSON.stringify(item), headers: { 'Content-Type': 'application/json' } })


    return
}