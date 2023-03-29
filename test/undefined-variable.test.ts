import { join } from 'path'
import { describe, expect, it } from 'vitest'
import { getOCtoACRelation } from '../src/core'

const cssFile = join(__dirname, './test-variable.scss')


describe('Get 「origin -> atom」map with scss variable', () => {
  it('should throw error', async () => {
    try {
      const res = await getOCtoACRelation(cssFile)
      expect(res).toMatchInlineSnapshot(``)
    } catch (e) {
      expect(e).toMatchInlineSnapshot(`
        [Error: Undefined variable.
          ╷
        2 │   flex: $test_flex;
          │         ^^^^^^^^^^
          ╵
          test/test-variable.scss 2:9  root stylesheet]
      `)
    }
  })
})