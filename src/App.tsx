import { useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'
import AppNavigationMenu from '@/components/navbar'
import { Input } from '@/components/ui/input'
import { toast } from "sonner"


function App() {
  const [username, setUsername] = useState('')

  const checkUsername = () => {
    if (!username) {
      toast.warning('Please enter the username')
    }
  }

  const onCreateRoom = () => {
    checkUsername()
  }

  const onJoinRoom = () => {
    checkUsername()
  }

  return (
    <div className="min-h-screen">
      <AppNavigationMenu />
      <div className="flex flex-col items-center justify-center h-100">
        <div className="flex flex-col gap-4">
          <Input placeholder="Your username..." value={username} onInput={e => setUsername(e.target.value)} />
          <Button className="text-xl" onClick={onCreateRoom}>Create Room</Button>
          <Button className="text-xl" onClick={onJoinRoom}>Join Room</Button>
        </div>
      </div>
    </div>
  )
}

export default App
