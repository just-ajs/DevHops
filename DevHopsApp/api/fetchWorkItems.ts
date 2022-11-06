import type { WorkItem } from '../types'
import data from './data.json'

export const fetchWorkItems = async (): Promise<WorkItem[]> => {
   return data.map((d: any) => {
    d.status = d.status.toLowerCase()
    d.statusUpdates.forEach((s: any) => (s.status = s.status.toLowerCase()))
    return d
   })
}