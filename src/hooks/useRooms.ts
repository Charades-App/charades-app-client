import * as api from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export const useRooms = () => {
  const [roomOwnerId, setRoomOwnerId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);

  const createRoom = useMutation({
    mutationFn: api.createRoom,
    onSuccess: (data) => {
      localStorage.setItem('ownerId', data.newRoomOwnerId);
      localStorage.setItem('roomId', data.newRoomId);
      setRoomOwnerId(data.newRoomOwnerId);
      setRoomId(data.newRoomId);
    }
  })

  const joinRoom = useMutation({
    mutationFn: api.joinRoom,
    onSuccess: (data, { roomId }) => {
      localStorage.setItem('roomId', roomId);
      localStorage.setItem('playerId', data.joinRoomPlayerId);
      setRoomId(roomId);
      setPlayerId(data.joinRoomPlayerId);
    }
  })

  useEffect(() => {
    setRoomOwnerId(localStorage.getItem('ownerId'));
    setRoomId(localStorage.getItem('roomId'));
    setPlayerId(localStorage.getItem('playerId'));
  }, [])

  return {
    createRoom: createRoom.mutate,
    joinRoom: joinRoom.mutate,
    ownerId: roomOwnerId,
    roomId: roomId,
    playerId: playerId,
  }
}
