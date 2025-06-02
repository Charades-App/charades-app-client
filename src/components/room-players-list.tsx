import { useRoom } from "@/hooks/useRoom";
import { Button } from "./ui/button";

export type RoomPlayersListProps = {
  roomId: string;
}

export const RoomPlayersList = ({
  roomId
}: RoomPlayersListProps) => {
  const { room } = useRoom(roomId);

  return (room?.roomStatePlayers ?? []).map((player, idx) => {
    return (
      <div className="flex items-center gap-4 my-4">
        <span>{idx + 1}.</span>
        <span>{player.playerId}</span>
        <span>{player.playerUsername}</span>
        <span>
          <Button>
            Set as current
          </Button>
        </span>
      </div>
    )
  });
}
