import * as api from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export const useRooms = () => {
  const [roomOwnerId, setRoomOwnerId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);

  const createRoom = useMutation({
    mutationFn: api.createRoom,
    onSuccess: (data) => {
      localStorage.setItem('ownerId', data.newRoomOwnerId);
      localStorage.setItem('roomId', data.newRoomId);
      setRoomOwnerId(data.newRoomOwnerId);
      setRoomId(data.newRoomId);
    }
  })

  useEffect(() => {
    setRoomOwnerId(localStorage.getItem('ownerId'));
    setRoomId(localStorage.getItem('roomId'));
  }, [])

  return {
    createRoom: createRoom.mutate,
    ownerId: roomOwnerId,
    roomId: roomId,
  }
}
