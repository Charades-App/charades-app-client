import { useRoom } from "@/hooks/useRoom";
import { Button } from "./ui/button";

export type RoomPlayersListProps = {
  roomId: string;
  ownerId: string;
}

export const RoomPlayersList = ({
  roomId,
  ownerId,
}: RoomPlayersListProps) => {
  const { room, setCurrentPlayer } = useRoom(roomId);

  const setPlayer = (playerId: string) => {
    setCurrentPlayer({
      roomId,
      ownerId,
      playerId
    })
  }

  return (room?.roomStatePlayers ?? []).map((player, idx) => {
    return (
      <div className="flex items-center gap-4 my-4">
        <span>{idx + 1}.</span>
        <span>{player.playerId}</span>
        <span className="w-[120px]">{player.playerUsername}</span>
        <span>
          <Button onClick={() => setPlayer(player.playerId)}>
            Set as current
          </Button>
        </span>
      </div>
    )
  });
}
