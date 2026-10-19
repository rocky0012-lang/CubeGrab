import { NextResponse } from 'next/server'

// The client you created from the Server-Side Auth instructions
import { createClient } from '@/lib/supabase/server'

const ALLOWED_DASHBOARD_ROUTES = ['/tenant/dashboard', '/owner/dashboard', '/onboarding', '/email-confirmed']

    export async function GET(request: Request) {
      const { searchParams, origin } = new URL(request.url)
      const code = searchParams.get('code')
      const targetRole = searchParams.get('role')
    
      const ERROR_REDIRECT_ROUTE = `${origin}/auth-code-error`
    
      const hasRoleParam = targetRole != null
      const isValidRoleInput = targetRole === 'tenant' || targetRole === 'owner'
    
      if (hasRoleParam && !isValidRoleInput) {
        console.error(`Blocked authentication loop: Malformed role parameter injected ("${targetRole}")`)
        return NextResponse.redirect(ERROR_REDIRECT_ROUTE)
      }
    
      // if "next" is in param, use it as the redirect URL
      let next = searchParams.get('next') ?? '/'
      if (!next.startsWith('/') || next.startsWith('//') || next.includes(':')) {
        next = '/'
      }
    
      const nextPathname = next.split('?')[0].split('#')[0] // Extract the pathname part of the next URL
    
      if (nextPathname !== '/') {
        if (!ALLOWED_DASHBOARD_ROUTES.includes(nextPathname)) {
          console.error(`Blocked unauthorized 'next' redirect path: ${next}`)
          next = '/'
        }
      }
    
      if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
          // user is authenticated
          const { data: { user }, } = await supabase.auth.getUser()
        
          if (!user) {
            return NextResponse.redirect(ERROR_REDIRECT_ROUTE)
          }
        
          const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('phone_number, user_role')
            .eq('id', user.id)
            .maybeSingle()
        
          if (profileError) {
            console.error('Error fetching user profile:', profileError)
            return NextResponse.redirect(ERROR_REDIRECT_ROUTE)
          }
        
          if (!profile) {
            console.error(`Security Alert: No profile row found in public.users for authenticated ID ${user.id}`)
            return NextResponse.redirect(ERROR_REDIRECT_ROUTE)
          }
        
          if (profile.user_role === 'pending' || !profile.user_role) {
            if (!hasRoleParam) {
                console.error(`Rejected registration update: targetRole parameter is invalid ("${targetRole}")`)
                return NextResponse.redirect(ERROR_REDIRECT_ROUTE)
            }
          
            const { data: updatedProfile, error: updateError } = await supabase
              .from('users')
              .update({ user_role: targetRole })
              .eq('id', user?.id)
              .select('phone_number, user_role')
              .maybeSingle()
          
            if (updateError || !updatedProfile) {
              console.error("Failed to commit user role variable allocation script:", updateError?.message)
              return NextResponse.redirect(ERROR_REDIRECT_ROUTE)
            }
          
            profile.user_role = updatedProfile.user_role
            profile.phone_number = updatedProfile.phone_number
          }
        
        
          else if (hasRoleParam && profile.user_role !== targetRole) {
            console.error(`Security Mismatch: Stored role is ${profile.user_role}, but URL string requested ${targetRole}`)
            return NextResponse.redirect(ERROR_REDIRECT_ROUTE)
          }
        
          if (!profile.phone_number) {
            return NextResponse.redirect(`${origin}/onboarding`)
          }
        
        if (nextPathname !== '/email-confirmed') {
          if (profile.user_role === 'tenant') {
            next = '/tenant/dashboard'
        } else if (profile.user_role === 'owner') {
          next = '/owner/dashboard'
        } else {
          return NextResponse.redirect(ERROR_REDIRECT_ROUTE)
        }
      }
    
        
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  

  // return the user to an error page with instructions
  return NextResponse.redirect(ERROR_REDIRECT_ROUTE)
}