import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { NameSchema } from '../../generic/models/Name'

export interface Node {
  name: string
  parent?: Node
}

export const NodeSchema: z.ZodSchema<Node> = z.lazy(() => z.object({
  name: NameSchema,
  parent: NodeSchema.optional(),
})).describe('Node')

export const NodesSchema = z.array(NodeSchema)
  .superRefine(getDuplicatesRefinement('Node', parseNodeUid))

export const NodeUidSchema = z.object({
  name: NameSchema,
})

export type NodeUid = z.infer<typeof NodeUidSchema>

export function parseNode(node: Node): Node {
  return NodeSchema.parse(node)
}

export function parseNodes(nodes: Node[]): Node[] {
  return NodesSchema.parse(nodes)
}

export function parseNodeUid(nodeUid: NodeUid): NodeUid {
  return NodeUidSchema.parse(nodeUid)
}

export const separator = '/'
