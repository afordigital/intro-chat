import { useEffect } from 'react'
import Tmi from 'tmi.js'

function App () {
  useEffect(() => {
    const client = new Tmi.Client({
      options: { debug: false },
      channels: ['afor_digital']
    })

    client.connect()

    client.on('message', async (channel, tags, message, self) => {
      if (self) return

      const { username, ['display-name']: displayName } = tags
    })
  }, [status])

  return (
    <div className='w-screen text-2xl h-screen flex justify-center items-center bg-[#050505] text-white'>
      <div>Suscríbete</div>
    </div>
  )
}

export default App
