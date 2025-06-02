import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as api from '@/lib/api'

export const useRoom = (roomId: string) => {
  const queryClient = useQueryClient();

  const roomState = useQuery({
    queryKey: ['room', roomId],
    queryFn: () => api.getRoomState(roomId),
    refetchInterval: 2000,
  })

  const setCurrentPlayer = useMutation({
    mutationFn: api.setCurrentPlayer,
    onSuccess: () => {
      console.log('Set current player')
      queryClient.invalidateQueries({ queryKey: ['room', roomId] });
    }
  })

  const setCurrentWord = useMutation({
    mutationFn: api.setCurrentWord,
    onSuccess: () => {
      console.log('Set current word')
      queryClient.invalidateQueries({ queryKey: ['room', roomId] });
    }
  })

  return {
    room: roomState.data,
    setCurrentPlayer: setCurrentPlayer.mutate,
    setCurrentWord: setCurrentWord.mutate,
  };
}
