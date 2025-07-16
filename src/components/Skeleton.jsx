import React from 'react'

const Skeleton = () => {
    return (
        <div role="status" class="max-w-sm animate-pulse">
            <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <span class="sr-only">Ładowanie...</span>
        </div>
    )
}

export default Skeleton