import { ProfileProvider } from '@/providers/profile-provider'
import { ReactNode } from 'react'

const Authlayout = ({children} : {children: ReactNode}) => {
  return (
    <ProfileProvider>
      <main>
        {children}
      </main>
    </ProfileProvider>
  )
}

export default Authlayout
