import { useEffect, useState } from 'react'
import Tmi from 'tmi.js'
import { Tronchx, addTronchx, updateTronchx } from './Tronchx'

const client = new Tmi.Client({
  options: { debug: false },
  channels: ['afor_digital']
})

function App () {
  const [tronchxsById, setTronchxsById] = useState<Map<Tronchx['id'], Tronchx>>(
    () => new Map()
  )
  const tronchxs = [...tronchxsById.values()]

  useEffect(() => {
    client.on('message', async (channel, userState, message) => {
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
      } else if (message.startsWith('!color')) {
        const color = message.slice(7)
        setTronchxsById(currentTronchxsById => {
          return updateTronchx(currentTronchxsById, {
            id: username,
            name: displayName,
            color
          })
        })
      }
    })
    client.connect()
    return () => {
      client.removeAllListeners('message')
      client.disconnect()
    }
  }, [])

  return (
    <div className='w-screen h-min-screen flex justify-center items-center bg-[#050505] '>
      <div className='grid grid-cols-6 gap-4 py-20'>
        {tronchxs.map(tronchx => (
          <div
            style={{ backgroundColor: tronchx.color }}
            className={`w-[150px] p-2 border-2 border-white h-[150px] flex items-center justify-center overflow-hidden`}
          >
            <span className='text-gray-800 truncate'>{tronchx.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
