'use client'

import {use} from 'react'

export default function ClientError({
    search,
}: {
    search: Promise<{ message?: string }>
}) {
    const params = use(search)
    return <p>Error: {params.message}</p>
}