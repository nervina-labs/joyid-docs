import * as HeadlessTab from '@radix-ui/react-tabs'
import cn from 'clsx'
import type { ComponentProps, ReactElement, ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'

type TabItem = string | ReactNode

type TabObjectItem = {
  label: TabItem
  disabled: boolean
}

function isTabObjectItem(item: unknown): item is TabObjectItem {
  return !!item && typeof item === 'object' && 'label' in item
}

function _Tabs({
  items,
  selectedIndex: _selectedIndex,
  defaultIndex = '0',
  onChange,
  children,
  storageKey,
}: {
  items: (TabItem | TabObjectItem)[]
  selectedIndex?: string
  defaultIndex?: string
  onChange?: (index: number) => void
  children: ReactNode
  storageKey?: string
}): ReactElement {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)

  useEffect(() => {
    if (_selectedIndex !== undefined) {
      setSelectedIndex(_selectedIndex)
    }
  }, [_selectedIndex])

  useEffect(() => {
    if (!storageKey) {
      // Do not listen storage events if there is no storage key
      return
    }

    function fn(event: StorageEvent) {
      if (event.key === storageKey) {
        setSelectedIndex(event.newValue!)
      }
    }

    const index = localStorage.getItem(storageKey)
    setSelectedIndex(index == null ? '0' : index)

    window.addEventListener('storage', fn)
    return () => {
      window.removeEventListener('storage', fn)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- only on mount

  const handleChange = useCallback((index: string) => {
    if (storageKey) {
      const newValue = String(index)
      localStorage.setItem(storageKey, newValue)

      // the storage event only get picked up (by the listener) if the localStorage was changed in
      // another browser's tab/window (of the same app), but not within the context of the current tab.
      window.dispatchEvent(
        new StorageEvent('storage', { key: storageKey, newValue })
      )
      return
    }
    setSelectedIndex(index)
    // onChange?.(index)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- only on mount

  return (
    <HeadlessTab.Root
      // selectedIndex={selectedIndex}
      // defaultIndex={defaultIndex}
      defaultValue="0"
      value={selectedIndex}
      onValueChange={handleChange}>
      <div className="nextra-scrollbar nx-overflow-x-auto nx-overflow-y-hidden nx-overscroll-x-contain">
        <HeadlessTab.List className="nx-mt-4 nx-flex nx-w-max nx-min-w-full nx-border-b nx-border-gray-200 nx-pb-px dark:nx-border-neutral-800">
          {items.map((item, index) => {
            const disabled = isTabObjectItem(item) && item.disabled
            const selected = index.toString() === selectedIndex
            return (
              <HeadlessTab.Trigger
                key={index}
                value={String(index)}
                disabled={disabled}
                className={cn(
                  'nx-mr-2 nx-rounded-t nx-p-2 nx-font-medium nx-leading-5 nx-transition-colors',
                  '-nx-mb-0.5 nx-select-none nx-border-b-2',
                  selected
                    ? 'nx-border-primary-500 nx-text-primary-600'
                    : 'nx-border-transparent nx-text-gray-600 hover:nx-border-gray-200 hover:nx-text-black dark:nx-text-gray-200 dark:hover:nx-border-neutral-800 dark:hover:nx-text-white',
                  disabled &&
                    'nx-pointer-events-none nx-text-gray-400 dark:nx-text-neutral-600'
                )}>
                {isTabObjectItem(item) ? item.label : item}
              </HeadlessTab.Trigger>
            )
          })}
        </HeadlessTab.List>
      </div>
      {children}
    </HeadlessTab.Root>
  )
}

export function Tab({
  children,
  ...props
}: ComponentProps<typeof HeadlessTab.Content>): ReactElement {
  return (
    <HeadlessTab.Content {...props} className="nx-rounded nx-pt-6">
      {children}
    </HeadlessTab.Content>
  )
}

export const Tabs = Object.assign(_Tabs, { displayName: 'Tabs', Tab })
