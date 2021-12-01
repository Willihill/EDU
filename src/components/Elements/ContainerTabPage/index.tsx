import React, { useEffect, useState } from 'react'

import styles from 'styles/components/Elements/ContainerTabPage/index.module.scss'

import { ContainerTabPageProps, ContainerTabPageTheme, ElementTabPage } from './types'

const ContainerTabPage = ({
  activeTabPage,
  theme = ContainerTabPageTheme.Purple,
  headerRightContent,
  children,
  contentWithPadding = true,
  onChangeActiveTabPage
}: ContainerTabPageProps) => {
  const [activeTab, setActiveTab] = useState<string | number>(activeTabPage ?? '')
  const [tabs, setTabs] = useState<ElementTabPage[]>([])

  useEffect(() => {
    if (!children) throw new Error('Tabs não informadas.')

    const elements: ElementTabPage[] = []
    if (Array.isArray(children)) elements.push(...children)
    else elements.push(children)

    setTabs(elements)
    const firstEnabledElement = elements.find(i => !i.props.disabled)
    !activeTab && firstEnabledElement && onPressTab(firstEnabledElement)()
  }, [children])

  useEffect(() => {
    activeTabPage && setActiveTab(activeTabPage)
  }, [activeTabPage])

  const getTabKey = (tab: ElementTabPage) => tab.key ?? tab.props?.title

  const onPressTab = (tab: ElementTabPage) => () => {
    if (tab.props.disabled) return

    if (!activeTabPage || !onChangeActiveTabPage) setActiveTab(getTabKey(tab)) // Internal control of active page
    else onChangeActiveTabPage?.(getTabKey(tab)) // External control of active page
  }

  return (
    <div
      className={styles.container}
      arial-theme={theme.valueOf()}
      arial-content-padding={String(contentWithPadding)}
    >
      <section className={styles.header}>
        <div className={styles.tabs}>
          {tabs.map(tab => (
            <div
              key={tab.props.title}
              className={styles.tab}
              arial-tab-selected={String(activeTab === getTabKey(tab))}
              arial-disabled={String(tab.props.disabled)}
              onClick={onPressTab(tab)}
            >
              <span>{tab.props.title}</span>
            </div>
          ))}
        </div>

        <div className={styles.rigthContent}>
          {headerRightContent}
        </div>
      </section>

      <section className={styles.content}>
        {tabs.find(item => getTabKey(item) === activeTab)}
      </section>
    </div>
  )
}

export default ContainerTabPage
