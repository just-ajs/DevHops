"use client"

import React, { useEffect, useState } from 'react'

export const Kanban = (): React.ReactElement => {
    const [value, setValue] = useState(2)

    useEffect(() => {
        setValue(4)
    }, [])

    return <h1>{value}</h1>
}