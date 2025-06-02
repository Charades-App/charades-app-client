import { useRooms } from "@/hooks/useRooms";
import { RoomPlayersList } from "./room-players-list";

export type RoomAdminScreenProps = {

}

export const RoomAdminScreen = (props: RoomAdminScreenProps) => {
  const { roomId } = useRooms();

  return (<div className="p-8">
    <h1 className="text-2xl mb-[2rem]">CHARADES ADMIN</h1>
    <div className="flex gap-4">
      <span className="font-bold">Room ID</span>
      <span>{roomId}</span>
    </div>
    <small>TIP: Copy this and share it with other players</small>
    <div className="mt-6">
      <h2>Players in this room</h2>
      {roomId && <RoomPlayersList roomId={roomId} />}
    </div>
  </div>)
}
