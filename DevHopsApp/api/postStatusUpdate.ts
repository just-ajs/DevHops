import type { StatusUpdate } from '../types'

export const postStatusUpdate = async (workItemId: string, status: StatusUpdate): Promise<void> => {
    const response = await fetch('http://localhost:5296/api/StatusUpdates', { method: 'POST', body: JSON.stringify({ ...status, workItemId }), headers: { 'Content-Type': 'application/json' } })
}