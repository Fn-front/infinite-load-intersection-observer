import { RefObject, useEffect } from 'react'

export const useIntersectionObserver = (
	refs: RefObject<HTMLElement>[],
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
          observer.unobserve(ref.current)
        }
      })
		}

	})
}