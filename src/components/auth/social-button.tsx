'use client'

import React from 'react'
import { SocialButton } from "@/components/base/buttons/social-button";
import { createClient } from '@/lib/supabase/client';
import { type Provider } from '@supabase/supabase-js'

interface SocialAuthButtonsProps {
  targetRole: 'tenant' | 'owner'
}

const SocialAuthButtons = ({ targetRole }: SocialAuthButtonsProps) => {

    const handleAuthLogin = async (providerName: Provider) => {
          const supabase = createClient()
          const { error } = await supabase.auth.signInWithOAuth({
            provider: providerName, 
            options: {
              redirectTo: `${window.location.origin}/callback?role=${targetRole}`,
            },
          })
          if (error) {
            // TODO: replace with toast/form-level error UI
            console.error(`${providerName} OAuth sign-in failed:`, error.message)
          }
        }
  return (
    <div className="flex flex-col gap-0">
      <div className="hidden lg:flex w-auto flex-col gap-3">
            <SocialButton onClick={() => handleAuthLogin('google')} social="google" theme="brand">
                Continue with Google
            </SocialButton>
            <SocialButton onClick={() => handleAuthLogin('facebook')} social="facebook" theme="brand">
                Continue with Facebook
            </SocialButton>
            <SocialButton onClick={() => handleAuthLogin('apple')} social="apple" theme="brand">
                Continue with Apple
            </SocialButton>
      </div>
      <div className="lg:hidden grid w-auto grid-cols-3 gap-3">
            <SocialButton onClick={() => handleAuthLogin('google')} social="google" theme="brand" />
            <SocialButton onClick={() => handleAuthLogin('facebook')} social="facebook" theme="brand" />
            <SocialButton onClick={() => handleAuthLogin('apple')} social="apple" theme="brand" />
      </div>
    </div>
  )
}

export default SocialAuthButtons
