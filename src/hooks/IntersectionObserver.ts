'use client'

import { RefObject, useEffect } from 'react'

export const useIntersectionObserver = (
	refs: RefObject<any>[],
	callback: (entries: IntersectionObserverEntry[]) => void,
	options?: IntersectionObserverInit
): void => {

	useEffect(() => {

		const observer = new IntersectionObserver(callback, options)

		// refsに入っている複数のhtmlに対してインスタンスを付与
		refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

		return () => {
			refs.forEach((ref) => {
        if (ref.current) {					
					// マウント解除
          observer.unobserve(ref.current)

					// disconnectしないとスクロールで戻った後再度画面に表示された際に実行されてしまう
					observer.disconnect()
        }
      })
		}

	})
}