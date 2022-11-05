"use client"

import React, { useEffect, useState } from 'react'
import Board from 'react-trello'
import type { Task } from '../types'
import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from '../api'

type KanbanProps = {
    tasks: Task[]
}

export const Kanban = ({ tasks }: KanbanProps): React.ReactElement => {
    // const { data } = useQuery({ queryKey: ['workitem'], queryFn: fetchTasks })
    const data: Task[] = []

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

    return <Board data={boardData} />
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