import { isEqual } from 'lodash-es'
import { Node, separator } from '../Node'

export function findNodeByPath(nodes: Node[], path: string) {
  const components = path.split(separator).map(c => c.trim())
  return components.reduce<Node | undefined>((parent, component) => {
    const node = nodes.find(n => n.name === component && isEqual(n.parent, parent))
    if (!node) throw new Error(`Could not find node by path: "${path}"`)
    return node
  }, undefined)
}
