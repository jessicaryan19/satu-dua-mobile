import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { View, Pressable } from "react-native";
import { useCall } from "@/hooks/useCall"; // Import the hook
import { useEffect, useState } from "react"; // Import useState
import { useRouter } from "expo-router";
import { insertCall } from "@/services/dbServices";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useAuth } from "@/hooks/useAuth";

export default function CallOngoingScreen() {
    const { callService, state, refreshState } = useCall();
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [hasInserted, setHasInserted] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const router = useRouter()
    const { location } = useCurrentLocation()
    const { session } = useAuth()



    const handleEndCall = async () => {
        await callService.leaveChannel();
        refreshState();
        router.push({ pathname: '/(tabs)' });
    };

    const handleToggleMute = () => {
        const newMuteState = !isMuted;
        setIsMuted(newMuteState);
        callService.muteLocalAudio(newMuteState);
    };

    const handleToggleSpeaker = () => {
        const newSpeakerState = !isSpeakerEnabled;
        setIsSpeakerEnabled(newSpeakerState);
        callService.enableSpeakerphone(newSpeakerState);
    };

    useEffect(() => {
        const handleStartCall = async () => {
            if (hasStarted) return;
            
            const result = await callService.startAndJoinChannel();
            setHasStarted(true)
            refreshState();
            if (!result.success) console.error(result.error);
        }
        handleStartCall();
    }, []);

    useEffect(() => {
        const handleInsertCall = async () => {
            if (hasInserted) return;
            if (state.channelName && session?.user.id && location?.locationDb) {
                const { data, error } = await insertCall(state.channelName, session.user.id, location.locationDb);
                setHasInserted(true)

                console.log('call', data)
                if (error) console.log(error);
            }
        }
        handleInsertCall();
    }, [state.channelName, session?.user.id, location?.locationDb]);

    useEffect(() => {
        let timerInterval: number;
        if (state.hasRemoteUser) {
            timerInterval = setInterval(() => {
                setElapsedSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }
        return () => {
            clearInterval(timerInterval);
            setElapsedSeconds(0);
        };
    }, [state.hasRemoteUser]);

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <View className="py-40 w-full h-full bg-black justify-between">
            <View>
                <ThemedText type="subtitle" className="text-slate-500 text-center">
                    {state.hasRemoteUser ? formatTime(elapsedSeconds) : 'Emergency Call - Calling...'}
                </ThemedText>
                <ThemedText type="strong" className="text-white text-center">
                    112
                </ThemedText>
            </View>

            <View className="flex flex-row w-full items-center justify-center gap-8">
                <View className="flex justify-center items-center gap-2">
                    <Pressable
                        className={`p-6 rounded-full ${isSpeakerEnabled ? 'bg-slate-500' : 'bg-slate-500/50'}`}
                        onPress={handleToggleSpeaker}
                    >
                        <IconSymbol size={42} name={isSpeakerEnabled ? "speaker.3.fill" : "speaker.slash.fill"} color={"#fff"} />
                    </Pressable>
                    <ThemedText className="text-white">Speaker</ThemedText>
                </View>

                <View className="flex justify-center items-center gap-2">
                    <Pressable className="bg-secondary p-6 rounded-full" onPress={handleEndCall}>
                        <IconSymbol size={42} name="phone.down.fill" color={"#fff"} />
                    </Pressable>
                    <ThemedText className="text-white">End</ThemedText>
                </View>

                <View className="flex justify-center items-center gap-2">
                    <Pressable
                        className={`p-6 rounded-full ${isMuted ? 'bg-red-500' : 'bg-slate-500/50'}`}
                        onPress={handleToggleMute}
                    >
                        <IconSymbol size={42} name={isMuted ? "mic.slash.fill" : "mic.fill"} color={"#fff"} />
                    </Pressable>
                    <ThemedText className="text-white">Mute</ThemedText>
                </View>
            </View>
        </View>
    );
}