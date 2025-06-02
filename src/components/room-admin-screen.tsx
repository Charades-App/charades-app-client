import { useRooms } from "@/hooks/useRooms";
import { RoomPlayersList } from "./room-players-list";
import { Input } from "./ui/input";
import { useRoom } from "@/hooks/useRoom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export type RoomAdminScreenProps = {

}

export const RoomAdminScreen = (props: RoomAdminScreenProps) => {
  const { roomId, ownerId } = useRooms();
  const { room, setCurrentWord } = useRoom(roomId!);

  const [word, setWord] = useState(room?.roomStateCurrentWord ?? "");

  const onSetWord = () => {
    if (word && roomId && ownerId) {
      setCurrentWord({
        word,
        roomId,
        ownerId
      })
    }
  }

  useEffect(() => {
    if (room?.roomStateCurrentWord)
      setWord(room.roomStateCurrentWord);
  }, [room]);

  return (<div className="p-8">
    <h1 className="text-2xl mb-[2rem]">CHARADES ADMIN</h1>
    <div className="flex gap-4">
      <span className="font-bold">Room ID</span>
      <span>{roomId}</span>
    </div>
    <small>TIP: Copy this and share it with other players</small>
    <div className="flex gap-2 max-w-[300px] mt-6">
      <Input placeholder="Current word..." value={word} onInput={e => setWord(e.target.value)} />
      <Button onClick={onSetWord}>Set Word</Button>
    </div>
    <div className="mt-6">
      <h2>Players in this room</h2>
      {roomId && ownerId && <RoomPlayersList roomId={roomId} ownerId={ownerId} />}
    </div>
  </div>)
}
