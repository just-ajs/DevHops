import type { WorkItem } from '../types'
import data from './data.json'

export const fetchWorkItems = async (): Promise<WorkItem[]> => {
   return data.map((d: any) => {
    d.status = d.status.toLowerCase()
    d.statusUpdates.forEach((s: any) => (s.status = s.status.toLowerCase()))
    d.statusUpdates.sort((a: any, b: any) => (a.updateTime < b.updateTime) ? -1 : ((a.updateTime > b.updateTime) ? 1 : 0)).reverse()
    return d
   })
}