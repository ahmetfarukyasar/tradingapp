import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const handleSignOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/auth/signin')
  }

  return (
    <nav className="p-4 border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Trading App</div>
        <ul className="flex space-x-6">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
          {
            user
            ?
            <li>
              <form action={handleSignOut}>
                <button type="submit" className="hover:underline cursor-pointer">Sign Out</button>
              </form>
            </li>
            :
            <li><a href="/auth/signin" className="hover:underline">Sign In</a></li>
          }
        </ul>
      </div>
    </nav>
  )
}