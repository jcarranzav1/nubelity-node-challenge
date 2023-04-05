import { type Domain } from '../src/interfaces'
import {
  aggregateHitsByTopLevelDomain,
  filterDomainsByMinHits,
  formatDomainsOutput,
  parseDomains,
  sortDomainsByHitsAndName
} from '../src/utils'

describe('Utils', () => {
  describe('parseDomains', () => {
    it('should parse domains from a string', () => {
      const domainsList = 'example.com 10\nsub.example.com 5\n'
      const expected: Domain[] = [
        { name: 'example.com', hits: 10 },
        { name: 'sub.example.com', hits: 5 }
      ]
      expect(parseDomains(domainsList)).toEqual(expected)
    })
  })
  describe('aggregateHitsByTopLevelDomain', () => {
    it('should aggregate hit counts by top level domain', () => {
      const domains: Domain[] = [
        { name: 'example.com', hits: 10 },
        { name: 'sub.example.com', hits: 5 }
      ]
      const expected: Domain[] = [{ name: 'example.com', hits: 15 }]
      expect(aggregateHitsByTopLevelDomain(domains)).toEqual(expected)
    })
  })

  describe('filterDomainsByMinHits', () => {
    it('should filter domains by minimum hit count', () => {
      const domains: Domain[] = [
        { name: 'example.com', hits: 10 },
        { name: 'sub.example.com', hits: 5 }
      ]
      const expected: Domain[] = [{ name: 'example.com', hits: 10 }]
      expect(filterDomainsByMinHits(domains, 8)).toEqual(expected)
    })
  })

  describe('sortDomainsByHitsAndName', () => {
    it('should sort domains by hit count and name', () => {
      const domains: Domain[] = [
        { name: 'sub.example.com', hits: 5 },
        { name: 'example.com', hits: 10 }
      ]
      const expected: Domain[] = [
        { name: 'example.com', hits: 10 },
        { name: 'sub.example.com', hits: 5 }
      ]
      expect(sortDomainsByHitsAndName(domains)).toEqual(expected)
    })
  })

  describe('formatDomainsOutput', () => {
    it('should format domains into a string output', () => {
      const domains: Domain[] = [
        { name: 'example.com', hits: 10 },
        { name: 'example.org', hits: 5 },
        { name: 'example.net', hits: 3 }
      ]
      const expectedOutput =
        'example.com (10)\nexample.org (5)\nexample.net (3)'
      expect(formatDomainsOutput(domains)).toEqual(expectedOutput)
    })
  })
})
