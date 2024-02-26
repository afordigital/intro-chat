import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef
} from 'react'
import Tmi from 'tmi.js'

export const useTMI = (
  client: Tmi.Client,
  onMessage: (
    channel: string,
    userState: Tmi.ChatUserstate,
    message: string,
    self: boolean
  ) => void
) => {
  const onMessageRef = useRef(onMessage)

  useLayoutEffect(() => {
    onMessageRef.current = onMessage
  }, [onMessageRef])

  useEffect(() => {
    client.on('message', (...args) => {
      onMessageRef.current(...args)
    })
    client.connect()
    return () => {
      client.removeAllListeners('message')
      client.disconnect()
    }
  }, [client, onMessageRef])
}
