import { EventEmitter } from 'events';

class RealtimeService extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(100);
  }

  broadcast(type, payload = {}) {
    const message = {
      type,
      payload,
      timestamp: new Date().toISOString(),
    };
    this.emit('sync', message);
  }
}

export const realtimeService = new RealtimeService();
