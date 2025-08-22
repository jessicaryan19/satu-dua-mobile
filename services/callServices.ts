export interface RNCallState {
  channelName?: string;
  token?: string;
  appId?: string;
  isChannelOwner: boolean;
}

export interface RNCallCallbacks {
  onError?: (error: string) => void;
  onChannelStarted?: (data: { channelName: string; token: string; appId: string }) => void;
}

export class RNCallService {
  private state: RNCallState = {
    channelName: undefined,
    token: undefined,
    appId: undefined,
    isChannelOwner: false,
  };

  private callbacks: RNCallCallbacks = {};

  constructor(callbacks: RNCallCallbacks = {}) {
    this.callbacks = callbacks;
  }

  public getState(): Readonly<RNCallState> {
    return { ...this.state };
  }

  public async startChannel(): Promise<{ success: boolean; channelName?: string; token?: string; appId?: string; error?: string }> {
    try {
      const apiEndpoint = `${process.env.EXPO_PUBLIC_AGORA_CREDENTIALS_API}/start-call` || "http://localhost:3000/api/start-call";
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      };

      const res = await fetch(apiEndpoint, requestOptions);

      if (!res.ok) {
        throw new Error(`API request failed: ${res.status} ${res.statusText}`);
      }

      const responseData = await res.json();

      const appId = responseData.appId;
      const channel = responseData.channel || responseData.channelName;
      const token = responseData.token;

      if (!appId || !channel || !token) {
        throw new Error("Invalid response: missing appId, channel, or token");
      }

      this.state = {
        appId,
        channelName: channel,
        token,
        isChannelOwner: true
      };

      this.callbacks.onChannelStarted?.({ channelName: channel, token, appId });

      console.log(`Successfully started channel: ${channel}`);
      return { success: true, channelName: channel, token, appId };
    } catch (error: any) {
      const errorMessage = `Failed to start channel: ${error.message}`;
      console.error(errorMessage, error);
      this.callbacks.onError?.(errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  public cleanup(): void {
    this.state = {
      channelName: undefined,
      token: undefined,
      appId: undefined,
      isChannelOwner: false,
    };
  }
}

