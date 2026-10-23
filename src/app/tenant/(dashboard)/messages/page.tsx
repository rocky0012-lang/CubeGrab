import { Suspense } from "react";
import React from 'react'
import MessagesPage from '@/components/sections/tenant/messagespage';

const MessagePage = () => {
  return <Suspense fallback={null}><MessagesPage /></Suspense>;
}

export default MessagePage
