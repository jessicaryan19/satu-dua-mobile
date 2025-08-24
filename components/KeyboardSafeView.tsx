import { Colors } from "@/constants/Colors"
import { ReactNode } from "react"
import { KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native"

type KeyboardSafeViewProps = {
    children: ReactNode
}
export default function KeyboardSafeView({
    children
}: KeyboardSafeViewProps) {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", gap: 42, padding: 20, backgroundColor: Colors.light.background }}
                    keyboardShouldPersistTaps="handled"
                >
                    {children}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}