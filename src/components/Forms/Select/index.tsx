import React, { SyntheticEvent, useEffect, useRef, useState, memo, ChangeEvent, KeyboardEvent } from 'react'
import { BsSearch } from 'react-icons/bs'
import { CgClose, CgMathPlus } from 'react-icons/cg'
import { FaPencilAlt } from 'react-icons/fa'
import { IoIosRefresh } from 'react-icons/io'
import { MdArrowDropDown } from 'react-icons/md'

import { ComponentOutsidePress } from 'components/Elements'
import { FetchEmpty, FetchError, LoadingHorizontal, LoadingIndicator } from 'components/Widget'
import { LoadingHorizontalTheme } from 'components/Widget/LoadingHorizontal/types'
import { LoadingIndicatorTheme } from 'components/Widget/LoadingIndicator/types'

import styles from 'styles/components/Forms/SelectFetch/index.module.scss'

import { hasScrolledToEnd } from 'utils/events'

import { SelectFetchProps, SelectFetchRowProps, SelectDataProps } from './types'

const Row = memo(({
  description,
  isSelected = false,
  onPressEdit
}: SelectFetchRowProps) => {
  const onPressEditIcon = (event: React.MouseEvent) => {
    event.stopPropagation()
    onPressEdit?.()
  }
  return (
    <div
      className={styles.option}
      arial-selected={String(isSelected)}
    >
      <span>{description}</span>
      {onPressEdit && (
        <FaPencilAlt
          className={styles.iconEdit}
          title='Editar'
          onClick={onPressEditIcon}
        />
      )}
    </div>
  )
})

const REVALIDATE_DEBOUNCE = 30000
const PLACEHOLDER_DEFAULT = 'Selecione um item'

const SelectData = <T extends any> ({
  label = '',
  required = false,
  disabled = false,
  placeholder = PLACEHOLDER_DEFAULT,
  selectedItem,
  data,
  searchable = false,
  filterProp,
  renderItem,
  onPressItem,
  onPressRemoveSelectedItem
}: SelectDataProps<T>) => {
  const [showMenu, setShowMenu] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [currentData, setCurrentData] = useState(data)

  const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setInputValue(value)
    setCurrentData(filterProp ? data.filter(el => !value || String(el[filterProp])?.includes(value)) : data)
  }

  const onPressOpenMenu = () => {
    if (disabled) return
    setShowMenu(true)
  }

  const onPressCloseMenu = () => setShowMenu(false)

  const onPressRow = (item: T) => () => {
    setShowMenu(false)
    onPressItem(item)
  }

  const getPlaceholder = () => selectedItem !== '' ? selectedItem : '' // placeholder

  return (
    <ComponentOutsidePress
      className={styles.container}
      actived={showMenu}
      arial-disabled={String(disabled)}
      onPressOutside={onPressCloseMenu}
    >
      {label !== '' && (
        <label
          onClick={onPressOpenMenu}
          className={styles.label}
        >
          {`${label} ${required ? '*' : ''}`}
        </label>
      )}

      <div className={styles.content}>
        <div
          className={styles.control}
          arial-showmenu={String(showMenu)}
          onClick={onPressOpenMenu}
        >
          <div className={styles.left}>
            {showMenu && searchable
              ? (
                <input
                  className={styles.input}
                  placeholder={getPlaceholder()}
                  onChange={onChangeInputValue}
                  value={inputValue}
                  autoFocus
                />
                )
              : <span className={styles.placeholder}>{getPlaceholder()}</span>}
          </div>

          <div className={styles.right}>
            {(!inputValue && selectedItem && !disabled && onPressRemoveSelectedItem) && (
              <CgClose
                className={styles.removeSelectedItem}
                title='Remover selecionado'
                onClick={onPressRemoveSelectedItem}
              />
            )}
            <MdArrowDropDown className={styles.arrowDown} />
          </div>
        </div>

        {showMenu && (
          <div
            className={styles.menu}
          >
            {(!!currentData.length) && (
              <div
                arial-scrollbar-theme='blue'
                className={styles.scroll}
              >
                {currentData.map((item, idx) => (
                  <div
                    key={idx}
                    className={styles.rowItem}
                    onClick={onPressRow(item)}
                  >
                    {renderItem(item)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ComponentOutsidePress>
  )
}

const SelectFetch = <T extends any> ({
  label = '',
  required = false,
  disabled = false,
  selectedItem,
  rowKey,
  renderItem,
  hookFetchData,
  onPressItem,
  onPressAddItem,
  onPressRemoveSelectedItem
}: SelectFetchProps<T>) => {
  const [showMenu, setShowMenu] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('')

  const revalidateTimeRef = useRef<Date>(new Date())

  const {
    data,
    hasMore,
    isValidating,
    error,
    loadMore,
    revalidate
  } = hookFetchData(filter)

  useEffect(() => {
    !showMenu && onPressCleanSearch()
  }, [showMenu])

  const onPressOpenMenu = () => {
    if (disabled) return
    setShowMenu(true)
    revalidateData()
  }

  const onPressCloseMenu = () => setShowMenu(false)

  const onPressRow = (item: T) => () => {
    setShowMenu(false)
    onPressItem(item)
  }

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toUpperCase() !== 'ENTER') return
    event.preventDefault()
    onPressSearch()
  }

  const onPressSearch = () => setFilter(inputValue)
  const onPressCleanSearch = () => {
    setInputValue('')
    setFilter('')
  }

  const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)

  const revalidateData = async () => {
    const currentTime = revalidateTimeRef.current.getTime()
    const time = new Date().getTime()
    if (isValidating || (time - currentTime) < REVALIDATE_DEBOUNCE) return

    await revalidate()
    revalidateTimeRef.current = new Date(time)
  }

  const forceRevalidateData = async (event: any) => {
    event.preventDefault()
    await revalidate()
    revalidateTimeRef.current = new Date(new Date())
  }

  const loadMoreData = (event: SyntheticEvent<HTMLDivElement>) =>
    (hasMore && hasScrolledToEnd(event, 10) && !isValidating && loadMore) && loadMore()

  const getSearchPlaceholder = () => selectedItem !== '' ? selectedItem : 'Pesquisar'

  return (
    <ComponentOutsidePress
      className={styles.container}
      arial-disabled={String(disabled)}
      actived={showMenu}
      onPressOutside={onPressCloseMenu}
    >
      {label !== '' && (
        <label
          onClick={onPressOpenMenu}
          className={styles.label}
        >
          {`${label} ${required ? '*' : ''}`}
        </label>
      )}

      <div className={styles.content}>
        <div
          className={styles.control}
          arial-showmenu={String(showMenu)}
          onClick={onPressOpenMenu}
        >
          {(isValidating && showMenu && !!data.length) && (
            <div className={styles.loadingHorizontal}>
              <LoadingHorizontal theme={LoadingHorizontalTheme.Purple} />
            </div>
          )}
          <div className={styles.left}>
            {showMenu
              ? (
                <input
                  className={styles.input}
                  placeholder={getSearchPlaceholder()}
                  onChange={onChangeInputValue}
                  onKeyDown={onSearchKeyDown}
                  value={inputValue}
                  autoFocus
                />
                )
              : (
                <span className={styles.placeholder}>{selectedItem}</span>
                // <div>
                // </div>
                )}
          </div>

          <div className={styles.actions}>
            {!!onPressAddItem && (
              <CgMathPlus
                className={styles.addIcon}
                title='Adicionar'
                onClick={onPressAddItem}
              />
            )}

            {(!inputValue && selectedItem && !disabled && onPressRemoveSelectedItem) && (
              <CgClose
                className={styles.removeSelectedItem}
                title='Remover selecionado'
                onClick={onPressRemoveSelectedItem}
              />
            )}

            {showMenu && (
              <IoIosRefresh
                className={styles.refresh}
                title='Atualizar lista'
                onClick={forceRevalidateData}
              />
            )}

            <BsSearch
              className={styles.searchIcon}
              title='Pesquisar'
              onClick={() => onPressSearch()}
            />
          </div>
        </div>

        {showMenu && (
          <div
            className={styles.menu}
          >
            {(isValidating && !data.length) && (
              <div className={styles.menuAux}>
                <LoadingIndicator
                  size={30}
                  theme={LoadingIndicatorTheme.BlueLight}
                />
              </div>
            )}

            {(error && !isValidating) && (
              <div className={styles.menuAux}>
                <FetchError
                  title='Erro ao carregar itens'
                  error={error.message}
                  sizeIcon={70}
                  sizeTitle={17}
                  sizeError={11}
                />
              </div>
            )}

            {(!data.length && !error && !isValidating) && (
              <div className={styles.menuAux}>
                <FetchEmpty sizeIcon={50} sizeTitle={12} />
              </div>
            )}

            {(!!data.length && !error) && (
              <div
                arial-scrollbar-theme='blue'
                onScroll={loadMoreData}
                className={styles.scroll}
              >
                {data.map((item, idx) => (
                  <div
                    key={rowKey ? String(item[rowKey]) : idx}
                    className={styles.rowItem}
                    onClick={onPressRow(item)}
                  >
                    {renderItem(item)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ComponentOutsidePress>
  )
}

export {
  SelectData as Data,
  SelectFetch as Fetch,
  Row
}
