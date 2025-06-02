import { useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'
import AppNavigationMenu from '@/components/navbar'
import { Input } from '@/components/ui/input'
import { toast } from "sonner"
import { useRooms } from './hooks/useRooms'
import { RoomAdminScreen } from './components/room-admin-screen'
import { RoomPlayerScreen } from './components/room-player-screen'


function App() {
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState<string>('');
  const { createRoom, joinRoom, ownerId, playerId } = useRooms()

  const checkUsername = () => {
    if (!username) {
      toast.warning('Please enter the username')
      return false;
    }
    return true;
  }

  const onCreateRoom = () => {
    if (checkUsername())
      createRoom(username)
  }

  const onJoinRoom = () => {
    if (checkUsername())
      joinRoom({
        roomId,
        username,
      });
  }

  if (ownerId) {
    return <RoomAdminScreen />;
  }

  if (playerId) {
    return <RoomPlayerScreen username={username} />
  }

  return (
    <div className="min-h-screen">
      <AppNavigationMenu />
      <div className="flex flex-col items-center justify-center h-100">
        <div className="flex flex-col gap-4 w-[500px]">
          <Input placeholder="Your username..." value={username} onInput={e => setUsername(e.target.value)} />
          <div>
            <Input placeholder="Room ID..." value={roomId} onInput={e => setRoomId(e.target.value)} />
            <small>Only necessary when joining a room</small>
          </div>
          <Button className="text-xl" onClick={onCreateRoom}>Create Room</Button>
          <Button className="text-xl" onClick={onJoinRoom}>Join Room</Button>
        </div>
      </div>
    </div>
  )
}

export default App
