'use client'

import { useIntersectionObserver } from '@/hooks/IntersectionObserver';
import { useState, useEffect, useRef } from 'react'

export const InfiniteTable = () => {

  const [data, setData] = useState<string[]>([]);
  const [refData, setRefData] = useState<number[]>([])
  const scrollArea = useRef(null)
  const targetElement = useRef<HTMLTableRowElement>(null!)

  const intersectionObserverOptions = {
    root: scrollArea.current,
    rootMargin: '0px',
    threshold: 1.0
  }

  const handleIntersectionObserver = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // IntersectionObserverで条件を満たした時に実行
        // 連番の配列
        const array: Array<string> = [...Array(100)].map((_, i) => 'item'+((data.length + (i+1))))
        // 配列格納
        setData([...data, ...array])        
        setRefData([...refData, targetElement.current.rowIndex]);
        
      }
    })
  }

  // IntersectionObserver実行
  useIntersectionObserver([targetElement], handleIntersectionObserver, intersectionObserverOptions)

  useEffect(() => {
    
    // 初期データ作成
    // state変更とrender更新で無限呼び出しになるのでuseEffect内に記載
    const array: Array<string> = [...Array(100)].map((_, i) => 'item'+(i+1))
    // 配列格納
    setData(array)

  }, [])

  return (
    <div>
      <div style={{ overflowY: 'scroll', width: '70vw', margin: '32px auto 0' }} ref={scrollArea}>
        <div style={{ maxHeight: '500px' }}>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', width: '200px' }}>No</th>
                <th style={{ padding: '8px' }}>item</th>
              </tr>
            </thead>
            <tbody>
            { data.map((item, index) => {
              return (
                <tr key={index+1} ref={ data.length - 50 == index+1 ? targetElement : null }>
                  <td style={{ padding: '4px 8px' }}>No. {index+1}</td>
                  <td style={{ padding: '4px 8px' }}>{ item }</td>
                </tr>
              )
            }) }
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ marginTop: '32px' }}>
        <p>通過した連番</p>
        { refData.map((item, index) => {
            return (
              <p key={index}>{ item }</p>
            )
          }) }
      </div>
    </div>
  )
}

export default InfiniteTable