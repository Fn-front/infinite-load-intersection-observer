'use client'

import { useState, useEffect } from 'react'

export const InfiniteTable = () => {

  const [data, setData] = useState<string[]>([]);

  useEffect(() => {

    // 初期データ作成
    // state変更とrender更新で無限呼び出しになるのでuseEffect内に記載
    const array: Array<string> = [...Array(100)].map((_, i) => 'item'+(i+1))
    setData(array)

  }, [])

  return (
    <div style={{ overflowY: 'scroll', width: '70vw', margin: '32px auto 0' }}>
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
              <tr key={index}>
                <td style={{ padding: '4px 8px' }}>No. {index+1}</td>
                <td style={{ padding: '4px 8px' }}>{ item }</td>
              </tr>
            )
          }) }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InfiniteTable