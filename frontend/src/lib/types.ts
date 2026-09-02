// Hand-written mirrors for the starter API models kept in backend/server.py.
// Nothing infers types across the Python ↔ TypeScript boundary.
export interface StatusCheck {
  id: string;
  client_name: string;
  timestamp: string;
}

export interface StatusCheckCreate {
  client_name: string;
}