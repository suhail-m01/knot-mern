// MERN API Client for Knot
// Integrates React frontend with Express.js REST API & MongoDB Database

export interface MernStatusResponse {
  success: boolean;
  stack?: {
    name: string;
    version: string;
    components: {
      mongoDB: {
        title: string;
        status: string;
        mode: string;
        database: string;
        counts: {
          events: number;
          users: number;
          registrations: number;
          hackathons: number;
          communities: number;
        };
      };
      express: {
        title: string;
        status: string;
        port: number;
        uptimeSeconds: number;
        endpoints: string[];
      };
      react: {
        title: string;
        status: string;
        features: string[];
      };
      nodeJS: {
        title: string;
        version: string;
        platform: string;
        arch: string;
        memoryUsageMb: number;
      };
    };
  };
}

const API_BASE = '/api';

export class MernClient {
  private static isAvailable: boolean | null = null;
  private static lastCheck: number = 0;

  public static getBaseUrl(): string {
    return API_BASE;
  }

  public static async checkAvailability(): Promise<boolean> {
    const now = Date.now();
    // Cache availability check for 10 seconds
    if (this.isAvailable !== null && now - this.lastCheck < 10000) {
      return this.isAvailable;
    }

    try {
      const res = await fetch(`${API_BASE}/mern/ping`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(2500),
      });
      this.isAvailable = res.ok;
      this.lastCheck = now;
      return this.isAvailable;
    } catch {
      this.isAvailable = false;
      this.lastCheck = now;
      return false;
    }
  }

  public static async getStatus(): Promise<MernStatusResponse | null> {
    try {
      const res = await fetch(`${API_BASE}/mern/status`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  public static async getEvents(query?: Record<string, string>): Promise<any[] | null> {
    try {
      const params = new URLSearchParams(query || {});
      const res = await fetch(`${API_BASE}/events?${params.toString()}`, {
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.data || [];
    } catch {
      return null;
    }
  }

  public static async createEvent(eventData: any): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch {
      return null;
    }
  }

  public static async registerForEvent(payload: {
    eventId: string;
    userId: string;
    participationType?: 'solo' | 'team';
    teamName?: string;
    teamMembers?: any[];
    participantDetails?: any;
    answers?: Record<string, string>;
  }): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  public static async verifyCheckIn(token: string, eventId?: string): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE}/registrations/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, eventId }),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  public static async getCommunities(query?: Record<string, string>): Promise<any[] | null> {
    try {
      const params = new URLSearchParams(query || {});
      const res = await fetch(`${API_BASE}/communities?${params.toString()}`, {
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.data || [];
    } catch {
      return null;
    }
  }

  public static async getAgencyStatus(): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE}/agents/status`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  public static async triggerAgencyHarvest(): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE}/agents/harvest-all`, {
        method: 'POST',
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  public static async seedDatabase(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/seed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(10000),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
