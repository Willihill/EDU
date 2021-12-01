import React, { SyntheticEvent, useEffect, useRef } from 'react'

import { FetchEmpty, FetchError, LoadingHorizontal, LoadingIndicator } from 'components/Widget'

import styles from 'styles/components/Elements/ContainerFetch/index.module.scss'

import { hasScrollBar, hasScrolledToEnd } from 'utils/events'
import { promiseDelay } from 'utils/helpers/Promise'

import { ContainerFetchProps, ContainerFetchContentProps, ContainerFetchTheme } from './types'

const ERROR_FETCH_TITLE = 'Erro ao carregar lista'
const FORCE_LOAD_MORE_LIMIT = 5

const Container = ({
  countData = 0,
  hasMore = false,
  error,
  loading,
  theme = ContainerFetchTheme.White,
  children,
  revalidateData,
  loadMoreData
}: ContainerFetchProps) => {
  const scrollDataRef = useRef<HTMLDivElement>(null)
  const forceLoadMoreCount = useRef<number>(0)

  useEffect(() => {
    forceLoadMore()
  }, [countData])

  const onScrollData = (event: SyntheticEvent<HTMLDivElement>) =>
    (hasMore && hasScrolledToEnd(event) && !loading && loadMoreData) && loadMoreData()

  const forceLoadMore = async () => {
    await promiseDelay(true, 800)
    if (
      !hasMore ||
      !loadMoreData ||
      !scrollDataRef.current ||
      hasScrollBar(scrollDataRef.current) ||
      loading ||
      forceLoadMoreCount.current >= FORCE_LOAD_MORE_LIMIT
    ) return

    forceLoadMoreCount.current++
    loadMoreData()
  }

  return (
    <div
      className={styles.container}
      arial-theme={theme}
    >
      <div className={styles.content}>
        {(error && !loading) && (
          <FetchError
            title={ERROR_FETCH_TITLE}
            error={error.message}
          />
        )}

        {(loading && !countData) && (
          <LoadingIndicator backgroundColor='var(--gray-light)' color='var(--blue-dark)' size={50} />
        )}

        {(!countData && !loading && !error) && (
          <FetchEmpty />
        )}

        {(loading && !!countData) && (
          <div className={styles.refresh}>
            <LoadingHorizontal />
          </div>
        )}

        {(!!countData && !error) && (
          <div
            ref={scrollDataRef}
            className={styles.contentScroll}
            arial-scrollbar-theme='blue'
            onScroll={onScrollData}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

const Content = <T extends any>({
  data,
  gap = 15,
  renderItem
}: ContainerFetchContentProps<T>) => {
  return (
    <div
      className={styles.contentContainer}
      style={{
        gap
      }}
    >
      {data.map(item => (
        renderItem(item)
      ))}
    </div>
  )
}

export default {
  Container,
  Content
}
