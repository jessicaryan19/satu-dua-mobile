// lib/agora.ts
import {
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  AudioProfileType,
  AudioScenarioType,
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

export async function startAndJoinAgoraChannel(
  appId: string,
  token: string,
  channelName: string,
  onJoinSuccess?: (channel: string, uid: number) => void,
  onLeave?: () => void,
  onError?: (err: string) => void,
  onUserJoined?: () => void,
): Promise<AgoraSession | null> {
  try {
    // 1. Check permissions FIRST and AWAIT the result
    const hasPermission = await requestAudioPermissionAndroid();
    if (!hasPermission) {
      throw new Error('Microphone permission denied');
    }
    // 2. Create engine
    const engine = createAgoraRtcEngine();

    // 3. Initialize engine with Communication profile (not LiveBroadcasting)
    engine.initialize({
      appId,
      channelProfile: ChannelProfileType.ChannelProfileCommunication, // CHANGED
    });

    // 4. Enable audio modules
    engine.enableAudio();
    engine.enableLocalAudio(true); // ADDED - Critical for sending audio

    // 5. Set audio profile for better quality
    engine.setAudioProfile(
      AudioProfileType.AudioProfileDefault,
      AudioScenarioType.AudioScenarioGameStreaming // Good for real-time communication
    );

    // 6. Set client role (only needed for LiveBroadcasting, but keeping for compatibility)
    engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);

    // 7. Register event listeners with better error handling
    engine.registerEventHandler({
      onJoinChannelSuccess: (connection) => {
        console.log(`✅ Joined channel ${connection.channelId} with UID ${connection.localUid}`);
        onJoinSuccess?.(connection.channelId ?? "", connection.localUid ?? 0);
      },
      onLeaveChannel: () => {
        console.log('👋 Left channel');
        onLeave?.();
      },
      onError: (err, msg) => {
        console.error('Agora error:', err, msg);
        onError?.(`Agora Error ${err}: ${msg}`);
      },
      onLocalAudioStateChanged: (state, reason) => {
        console.log('🎤 Local audio state changed:', state, 'reason:', reason);
      },
      onRemoteAudioStateChanged: (connection, state, reason, elapsed) => {
        console.log('🔊 Remote audio state changed:', state);
      },
      onAudioDeviceStateChanged: (deviceId, deviceType, deviceState) => {
        console.log('🔊 Audio device state changed:', deviceType, deviceState);
      },
      onUserOffline(connection, remoteUid, reason) {
        console.log(`❌ User ${remoteUid} offline. Reason: ${reason}`)
        onLeave?.();
      },
      onUserJoined(connection, remoteUid, elapsed) {
        console.log(`✅ User ${remoteUid} joined.`);
        onUserJoined?.()
      },
    });

    // 8. Join channel
    engine.joinChannel(token, channelName, 0, {});

    return { engine, appId, token, channelName };
  } catch (error: any) {
    console.error('Failed to start/join Agora channel:', error);
    onError?.(error.message);
    return null;
  }
}

export async function leaveAgoraChannel(engine: IRtcEngine): Promise<void> {
  try {
    engine.leaveChannel();
    engine.release();
  } catch (error) {
    console.error('Error leaving Agora channel:', error);
  }
}
