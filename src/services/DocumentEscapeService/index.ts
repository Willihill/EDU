import { EscapeRegisterProps, EscapeUnsubscription } from './types'

class DocumentEscapeService {
  private queueSubscriptionsEscape: EscapeRegisterProps[]

  constructor () {
    this.queueSubscriptionsEscape = []
  }

  subscriptionEspace = (method: () => void): EscapeUnsubscription => {
    const escapeId = Math.random()

    const unsubscription = () => {
      this.queueSubscriptionsEscape = this.queueSubscriptionsEscape.filter(i => i.id !== escapeId)
    }

    this.queueSubscriptionsEscape.push({
      id: escapeId,
      method
    })

    return unsubscription
  }

  executeLastEscape = () =>
    this.queueSubscriptionsEscape.pop()?.method()
}

const escapeManager = new DocumentEscapeService()
export default escapeManager
