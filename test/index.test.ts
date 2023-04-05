import { countDomains } from '../src/index'

describe('countDomains', () => {
  it('should return the expected output for the given input', () => {
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
www.googleapis.com 87`
    const expectedOutput = `root-servers.net (1059)
google.com (957)
facebook.com (525)
google-analytics.com (525)`

    console.log(countDomains(DOMAIN_LIST, 500))
    expect(countDomains(DOMAIN_LIST, 500)).toEqual(expectedOutput)
  })
})
