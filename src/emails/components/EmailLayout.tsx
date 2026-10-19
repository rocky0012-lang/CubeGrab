import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailLayoutProps {
    preview: string;
    title: string;
    children: React.ReactNode;
}

export default function EmailLayout({
    preview,
    title,
    children,
}: EmailLayoutProps) {
    return (
        <Html>
            <Head />

            <Preview>{preview}</Preview>

            <Body style={{
                backgroundColor: "#0f1115",
                fontFamily: "Inter, Arial, sans-serif",
            }}
            >
                <Container
                    style={{
                        backgroundColor: "#171a21",
                        margin: "40px auto",
                        padding: "40px",
                        borderRadius: "16px",
                        maxWidth: "600px",
                    }}
                    >
                        <Heading
                            style={{
                                color: "#D4AF37",
                                textAlign: "center",
                            }}
                        >
                            CubeGrab
                        </Heading>

                        <Heading
                            as="h2"
                            style={{
                                color: "#ffffff",
                            }}
                        >
                            {title}
                        </Heading>

                        {children}
                                
                        <Hr />

                        <Text
                            style={{
                                color: "#9ca3af",
                                fontSize: "14px",
                            }}
                        >
                            Need help?
                            <br />
                                Contact us at{" "}
                            <a
                                href="mailto:support@cubegrab.com"
                                style={{color: "#D4AF37"}}
                            >
                                support@cubegrab.com
                            </a>
                        </Text>

                        <Text
                            style={{
                                color: "#6b7280",
                                fontSize: "12px",
                            }}
                        >
                            © 2026 CubeGrab Inc.
                        </Text>
                </Container>
            </Body>
        </Html>
    );
}