import { MIN_HITS } from './constants'
import {
  aggregateHitsByTopLevelDomain,
  filterDomainsByMinHits,
  formatDomainsOutput,
  parseDomains,
  sortDomainsByHitsAndName
} from './utils'

export function countDomains (domainsList: string, minHits = 0): string {
  const domains = parseDomains(domainsList)
  const hitsByDomain = aggregateHitsByTopLevelDomain(domains)
  const filteredDomains = filterDomainsByMinHits(hitsByDomain, minHits)
  const sortedDomains = sortDomainsByHitsAndName(filteredDomains)
  const output = formatDomainsOutput(sortedDomains)
  return output
}

const DOMAIN_LIST = `
*.amazon.co.uk 89
*.doubleclick.net 139
*.fbcdn.net 212
*.in-addr.arpa 384
*.l.google.com 317
1.client-channel.google.com 110
6.client-channel.google.com 45
a.root-servers.net 1059
apis.google.com 43
clients4.google.com 71
clients6.google.com 81
connect.facebook.net 68
edge-mqtt.facebook.com 56
graph.facebook.com 150
mail.google.com 128
mqtt-mini.facebook.com 47
ssl.google-analytics.com 398
star-mini.c10r.facebook.com 46
staticxx.facebook.com 48
www.facebook.com 178
www.google.com 162
www.google-analytics.com 127
www.googleapis.com 87
`

const result = countDomains(DOMAIN_LIST, MIN_HITS)
console.log(result)
