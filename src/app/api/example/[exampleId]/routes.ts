import type { NextRequest } from 'next/server'

export async function GET(_: NextRequest, { params }: { params: { exampleId: string } }) {
  const res = { test: `test${params.exampleId}` }

  return Response.json(res)
}
