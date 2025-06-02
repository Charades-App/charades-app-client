const API_BASE = import.meta.env.VITE_API_BASE;

export type CreateRoomResponse = {
  newRoomId: string;
  newRoomOwnerId: string;
}

/**
  * Create a new room for the given username.
  */
export const createRoom = async (username: string) => {
  const res = await fetch(`${API_BASE}/api/v1/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      newRoomOwner: username
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create room');
  }

  const data: CreateRoomResponse = await res.json();

  return data;
}

export type JoinRoomResponse = {
  joinRoomPlayerId: string;
}

export const joinRoom = async ({
  roomId,
  username
}: {
  roomId: string;
  username: string;
}) => {
  const res = await fetch(`${API_BASE}/api/v1/rooms/${roomId}/players`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      joinRoomRequestUsername: username
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to join room');
  }

  const data: JoinRoomResponse = await res.json();

  return data;
}

export type Player = {
  playerId: string;
  playerUsername: string;
}

export type RoomState = {
  roomStateCurrentWord: string | null;
  roomStatePlayers: Player[];
  roomStateCurrentPlayer: Player | null;
}

export const getRoomState = async (roomId: string) => {
  const res = await fetch(`${API_BASE}/api/v1/rooms/${roomId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch room state');
  }

  const data: RoomState = await res.json();

  console.log('Room state:', data);

  return data;
}

export const setCurrentPlayer = async ({
  roomId,
  ownerId,
  playerId,
}: {
  roomId: string;
  ownerId: string;
  playerId: string;
}) => {
  const res = await fetch(`${API_BASE}/api/v1/rooms/${roomId}/players/current`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      setPlayerUserIdR: playerId,
      setPlayerOwnerIdR: ownerId,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to set current player');
  }
}

export const setCurrentWord = async ({
  roomId,
  ownerId,
  word,
}: {
  roomId: string;
  ownerId: string;
  word: string;
}) => {
  const res = await fetch(`${API_BASE}/api/v1/rooms/${roomId}/words/current`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      setWordWordRequest: word,
      setWordOwnerIdRequest: ownerId,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to set current word');
  }
}
