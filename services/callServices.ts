// services/RNCallService.ts
import { startAndJoinAgoraChannel, leaveAgoraChannel } from '@/lib/agora';
import { IRtcEngine } from 'react-native-agora';

export interface RNCallState {
  appId?: string;
  token?: string;
  channelName?: string;
  isChannelOwner: boolean;
  joined: boolean;
  engine?: IRtcEngine;
  hasRemoteUser: boolean;
}

export interface RNCallCallbacks {
  onError?: (error: string) => void;
  onChannelJoined?: (channelName: string) => void;
  onChannelLeft?: () => void;
  onUserJoined?: () => void;
}

export class RNCallService {
  private state: RNCallState = {
    appId: undefined,
    token: undefined,
    channelName: undefined,
    isChannelOwner: false,
    joined: false,
    engine: undefined,
    hasRemoteUser: false,
  };

  private callbacks: RNCallCallbacks = {};

  constructor(callbacks: RNCallCallbacks = {}) {
    this.callbacks = callbacks;
  }

  public getState(): Readonly<RNCallState> {
    return { ...this.state };
  }

  /** Start a channel on backend and auto-join Agora */
  public async startAndJoinChannel(): Promise<{ success: boolean; channelName?: string; error?: string }> {
    try {
      const apiEndpoint = `${process.env.EXPO_PUBLIC_AGORA_CREDENTIALS_API}/start-call` || "http://localhost:3000/api/start-call";
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) throw new Error(`API request failed: ${res.status} ${res.statusText}`);

      const data = await res.json();
      const appId = data.appId;
      const token = data.token;
      const channelName = data.channel || data.channelName;

      if (!appId || !token || !channelName) {
        throw new Error('Invalid response from backend: missing appId, token, or channel');
      }

      // 2. Start Agora engine and join (now async)
      const session = await startAndJoinAgoraChannel(
        appId,
        token,
        channelName,
        (ch) => {
          this.state.joined = true;
          this.callbacks.onChannelJoined?.(ch);
        },
        () => {
          this.state.joined = false;
          this.callbacks.onChannelLeft?.();
        },
        (err) => {
          this.callbacks.onError?.(err);
        },
        () => {
          this.state.hasRemoteUser = true;
          this.callbacks.onUserJoined?.();
        }
      );

      if (!session) throw new Error('Failed to create/join Agora channel');

      // 3. Save state
      this.state = {
        ...this.state,
        appId,
        token,
        channelName,
        isChannelOwner: true,
        engine: session.engine,
      };

      return { success: true, channelName };
    } catch (error: any) {
      const errorMessage = `❌ Failed to start/join channel: ${error.message}`;
      console.error(errorMessage);
      this.callbacks.onError?.(errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  /** Leave Agora channel and clean up */
  public async leaveChannel(): Promise<void> {
    if (this.state.engine) {
      await leaveAgoraChannel(this.state.engine);
      this.state.engine = undefined;
    }
    this.state.joined = false;
    this.state.hasRemoteUser = false;
    this.callbacks.onChannelLeft?.();
  }

  /** Full cleanup */
  public async cleanup(): Promise<void> {
    await this.leaveChannel();
    this.state = {
      appId: undefined,
      token: undefined,
      channelName: undefined,
      isChannelOwner: false,
      joined: false,
      engine: undefined,
      hasRemoteUser: false
    };
  }

  /** Manual audio control methods */
  public async muteLocalAudio(muted: boolean): Promise<void> {
    if (this.state.engine) {
      this.state.engine.enableLocalAudio(!muted);
      console.log(`🔇 Mute audio: ${muted}`);
    }
  }

  public async enableSpeakerphone(enabled: boolean): Promise<void> {
    if (this.state.engine) {
      this.state.engine.setEnableSpeakerphone(enabled);
      console.log(`🔊 Enable speakerphone: ${enabled}`);
    }
  }
}
