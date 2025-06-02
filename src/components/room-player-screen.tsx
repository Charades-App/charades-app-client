import { useRoom } from "@/hooks/useRoom";
import { useRooms } from "@/hooks/useRooms";
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from "react";

export type RoomPlayerScreenProps = {
  username: string
}

export const RoomPlayerScreen = (props: RoomPlayerScreenProps) => {
  const { playerId, roomId } = useRooms();
  const { room } = useRoom(roomId!);

  if (!roomId) return null;

  return (<div className="p-8">
    <h1 className="text-2xl">Hello, {props.username}</h1>
    {room?.roomStateCurrentPlayer?.playerId === playerId && <HidingWord />}
    {room?.roomStateCurrentWord &&
      room?.roomStateCurrentPlayer?.playerId !== playerId &&
      <ShowingWord word={room.roomStateCurrentWord} />
    }
    {!room?.roomStateCurrentWord &&
      room?.roomStateCurrentPlayer?.playerId !== playerId &&
      <Waiting />
    }
  </div>
  );
}

const HidingWord = () => {
  return (
    <div className="flex flex-col items-center justify-center h-100 gap-4">
      <h2 className="text-3xl">Hooray!</h2>
      <span>It's your turn to guess!</span>
    </div>
  )
}

const ShowingWord = ({ word }: { word: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-100 gap-4">
      <h2 className="text-xl">The current word is:</h2>
      <span className="text-4xl">{word}</span>
    </div>
  )
}

const Waiting = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-100 gap-4">
      <h2 className="text-3xl">Patience!</h2>
      <Progress value={progress} className="w-[500px]" />
      <span>Waiting for the Room Master to start the round...</span>
    </div>
  )
}
