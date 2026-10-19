import { Button, Text, Tailwind } from "@react-email/components"
import EmailLayout from "./components/EmailLayout"

interface WelcomeUserEmailProps {
    firstName: string;
}

export default function WelcomeUserEmail({
    firstName,
}: WelcomeUserEmailProps) {
    return (
        <Tailwind>
        <EmailLayout
            preview="Welcome to CubeGrab!"
            title={`Welcome, ${firstName}!`}
            >
                <Text style={{ color: "#ffffff" }}>
                    Thank you for joining CubeGrab.
                </Text>

                <Text style={{ color: "#d1d5db" }}>
                    We&apos;re excited to help you find your next place with confidence and security. Our platform is designed to make your experience seamless and enjoyable.
                </Text>

                <Button
                    href="https://cubegrab.com"
                    className="mt-4 items-center justify-center rounded-lg bg-[#D4AF37] px-6 py-3 text-base font-semibold text-black no-underline transition-colors duration-150 hover:bg-[#bfa14f]"
                    style={{
                        backgroundColor: "#D4AF37",
                        color: "#000000",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        alignItems: "center",
                    }}
                >
                    Open CubeGrab
                </Button>
            </EmailLayout>
        </Tailwind>
    );
}