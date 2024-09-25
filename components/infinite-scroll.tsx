'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

type InfiniteScrollProps<T> = {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  loadMore: () => Promise<void>
  hasMore: boolean
}

export function InfiniteScroll<T>({ items, renderItem, loadMore, hasMore }: InfiniteScrollProps<T>) {
  const [ref, inView] = useInView()
  const [loading, setLoading] = useState(false)
  const prevInView = useRef(false)

  useEffect(() => {
    if (inView && !loading && hasMore && !prevInView.current) {
      setLoading(true)
      loadMore().finally(() => setLoading(false))
    }
    prevInView.current = inView
  }, [inView, loading, loadMore, hasMore])

  return (
    <>
      {items.map(renderItem)}
      {hasMore && (
        <div ref={ref} className="h-10">
          {loading && <p>Loading more...</p>}
        </div>
      )}
    </>
  )
}