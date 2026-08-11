'use client'

import { useProfileMe } from '@/services/hooks/profile'

export const ProfileMe = () => {
  const { data: profileMeData } = useProfileMe()
  return (
    <div className="flex items-center gap-2">
      {profileMeData?.data.avatar_url ? (
        <img
          className="min-h-9 min-w-9 rounded-full bg-gray-600"
          src={profileMeData?.data.avatar_url}
          alt="profile image"
        />
      ) : (
        <div className="min-h-9 min-w-9 bg-gray-600 rounded-full"></div>
      )}
      <div>{profileMeData ? profileMeData?.data.username : 'annoymous'}</div>
    </div>
  )
}
