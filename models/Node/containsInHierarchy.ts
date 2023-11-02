import { IsEqual } from 'libs/utils/lodash'

export const containsInHierarchy = <T extends { parent?: T | undefined }>(isEqual: IsEqual<T>) => (source: T) => (target: T): boolean => {
  if (isEqual(source)(target)) return true
  if (source.parent) return containsInHierarchy(isEqual)(source.parent)(target)
  return false
}

export const containsInHierarchyArr = <T extends { parent?: T | undefined }>(isEqual: IsEqual<T>) => (sources: T[]) => (target: T) => {
  const contains = containsInHierarchy(isEqual)
  return sources.reduce((result, tag) => result || contains(tag)(target), false)
}
