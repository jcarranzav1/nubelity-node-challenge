/**
 * Represents a domain name and its hits count.
 */
export interface Domain {
  /**
   * The name of the domain.
   */
  name: string

  /**
   * The number of hits the domain has received.
   */
  hits: number
}
