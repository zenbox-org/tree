import { Node, separator } from '../Node'

export function toPath(node: Node): string {
  return node.parent ? toPath(node.parent) + ` ${separator} ` + node.name : node.name
}
