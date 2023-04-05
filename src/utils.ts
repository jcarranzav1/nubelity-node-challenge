import { type Domain } from './interfaces'

/**
 * Parses a string of domains and hits, returning an array of Domain objects.
 *
 * @param domainsList A string of domains and hits, separated by spaces or tabs.
 * @returns An array of Domain objects representing the parsed domains and hits.
 */

export function parseDomains (domainsList: string): Domain[] {
  return domainsList
    .trim()
    .split('\n')
    .map((line) => {
      const [name, hitsStr] = line.split(' ')
      const hits = Number.parseInt(hitsStr)
      return { name, hits }
    })
}

/**
 * Returns the top level domain for a given domain name.
 *
 * @param domain The domain name to get the top level domain for.
 * @returns The top level domain for the given domain name.
 */
function getTopLevelDomain (domain: string): string {
  const domainParts = domain.split('.')
  const length = domainParts.length
  const topLevel = domainParts[length - 1]
  const secondLevel = domainParts[length - 2]

  if (['co', 'com'].includes(secondLevel) && length > 2) {
    return `${domainParts[length - 3]}.${secondLevel}.${topLevel}`
  }

  return `${secondLevel}.${topLevel}`
}

/**
 * Aggregates the hit counts of domains by their top level domain and returns an array of Domain objects.
 *
 * @param domains An array of Domain objects.
 * @returns An array of Domain objects with aggregated hit counts by their top level domain.
 */
export function aggregateHitsByTopLevelDomain (domains: Domain[]): Domain[] {
  const hitsByDomain: Record<string, number> = {}
  for (const domain of domains) {
    const domainName = getTopLevelDomain(domain.name)
    const hits =
      hitsByDomain[domainName] === undefined ? 0 : hitsByDomain[domainName]

    hitsByDomain[domainName] = hits + domain.hits
  }
  return Object.entries(hitsByDomain).map(([name, hits]) => ({ name, hits }))
}

/**
 * Filters an array of Domain objects by their hit count and returns a new array of Domain objects.
 *
 * @param domains An array of Domain objects.
 * @param minHits The minimum hit count to filter by.
 * @returns A new array of Domain objects with hit counts greater than or equal to the given minHits.
 */
export function filterDomainsByMinHits (
  domains: Domain[],
  minHits: number
): Domain[] {
  return domains
    .filter(({ hits }) => hits >= minHits)
    .map(({ name, hits }) => ({ name, hits }))
}

/**
 * Sorts an array of Domain objects by their hit count in descending order, and by name in ascending order if hit counts are equal.
 *
 * @param domains An array of Domain objects.
 * @returns A new array of Domain objects sorted by their hit count and name.
 */
export function sortDomainsByHitsAndName (domains: Domain[]): Domain[] {
  return domains.sort((a, b) => {
    if (b.hits !== a.hits) {
      return b.hits - a.hits
    }
    return a.name.localeCompare(b.name)
  })
}

/**
 * Formats an array of Domain objects into a string output.
 *
 * @param domains An array of Domain objects.
 * @returns A string representation of the given Domain objects.
 */
export function formatDomainsOutput (domains: Domain[]): string {
  return domains.map((domain) => `${domain.name} (${domain.hits})`).join('\n')
}
