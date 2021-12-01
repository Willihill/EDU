export interface EscapeRegisterProps {
  id: number
  method: () => void
}

export type EscapeUnsubscription = () => void
