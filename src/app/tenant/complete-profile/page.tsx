import React from 'react'
import { DropdownAvatar } from '@/components/reusable/dropdown-avatar'
import { ProfileProvider } from '@/providers/profile-provider'

const CompleteProfile = () => {


  return (
    <ProfileProvider>
      <main>
        Complete Profile Page
        <DropdownAvatar 
          sign-inPath="/sign-in"
        />
      </main>
    </ProfileProvider>
  )
}

export default CompleteProfile

