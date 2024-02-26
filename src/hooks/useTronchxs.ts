import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef
} from 'react'
import Tmi from 'tmi.js'
import { Tronchx, addTronchx, editTronchx } from '../Tronchx'
import { useTMI } from './useTMI'

export const useTronchxs = (client: Tmi.Client) => {
  const [tronchxsById, setTronchxsById] = useState<Map<Tronchx['id'], Tronchx>>(
    () => new Map()
  )
  const tronchxs = [...tronchxsById.values()]

  const updateTronchx = (tronchx: Tronchx) => {
    setTronchxsById(currentTronchxsById => {
      return editTronchx(currentTronchxsById, tronchx)
    })
  }

  useTMI(
    client,
    async function registerTronchxs (
      channel: string,
      userState: Tmi.ChatUserstate,
      message: string
    ) {
      const { username, ['display-name']: displayName } = userState

      if (!username) return
      if (!displayName) return

      if (message === '!join') {
        setTronchxsById(currentTronchxsById => {
          return addTronchx(currentTronchxsById, {
            id: username,
            name: displayName,
            color: '#FFFFFF'
          })
        })
      } else if (message.match('!color (?!url|data).+')) {
        const color = message.slice(7)
        setTronchxsById(currentTronchxsById => {
          return editTronchx(currentTronchxsById, {
            id: username,
            color
          })
        })
      }
    }
  )

  return { tronchxs, updateTronchx }
}
