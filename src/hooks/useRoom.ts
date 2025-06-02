import { useQuery } from "@tanstack/react-query"
import * as api from '@/lib/api'

export const useRoom = (roomId: string) => {
  const roomState = useQuery({
    queryKey: ['room', roomId],
    queryFn: () => api.getRoomState(roomId),
  })

  return {
    room: roomState.data,
  };
}
