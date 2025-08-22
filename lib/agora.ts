// lib/agora.ts
import {
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
  ClientRoleType,
} from 'react-native-agora';
import { PermissionsAndroid, Platform } from 'react-native';

const requestAudioPermissionAndroid = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'App needs access to your microphone to join voice calls',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error('Audio permission error:', err);
    return false;
  }
};

export interface AgoraSession {
  engine: IRtcEngine;
  appId: string;
  token: string;
  channelName: string;
}

export function startAndJoinAgoraChannel(
  appId: string,
  token: string,
  channelName: string,
  onJoinSuccess?: (channel: string, uid: number) => void,
  onLeave?: () => void,
  onError?: (err: string) => void
): AgoraSession | null {
  try {
    // 1. Permissions
    if (Platform.OS === 'android') {
      requestAudioPermissionAndroid().then((granted) => {
        if (!granted) {
          throw new Error('Microphone permission denied');
        }
      });
    }

    // 2. Create engine
    const engine = createAgoraRtcEngine();

    // 3. Initialize engine
    engine.initialize({
      appId,
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });

    // 4. Enable audio + set role
    engine.enableAudio();
    engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);

    // 5. Register listeners
    engine.registerEventHandler({
      onJoinChannelSuccess: (connection) => {
        console.log(`✅ Joined channel ${connection.channelId}`);
        onJoinSuccess?.(connection.channelId ?? "", connection.localUid ?? 0);
      },
      onLeaveChannel: () => {
        console.log('👋 Left channel');
        onLeave?.();
      },
      onError: (err, msg) => {
        console.error('Agora error:', err, msg);
        onError?.(msg);
      },
    });

    // 6. Join channel
    engine.joinChannel(token, channelName, 0, {});

    return { engine, appId, token, channelName };
  } catch (error: any) {
    console.error('Failed to start/join Agora channel:', error);
    onError?.(error.message);
    return null;
  }
}

export function leaveAgoraChannel(engine: IRtcEngine): void {
  try {
    engine.leaveChannel();
    engine.release();
  } catch (error) {
    console.error('Error leaving Agora channel:', error);
  }
}

