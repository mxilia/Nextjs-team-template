import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { profileApi } from '../api/profile'
import { CreateProfile, UpdateProfile } from '@/types/db'

export const getProfileMeOptions = () => {
  return {
    queryKey: ['profiles', 'me'],
    queryFn: () => profileApi.getMe(),
  }
}

export const useProfileMe = () => {
  return useQuery(getProfileMeOptions())
}

export const useCreateProfileMe = ({
  config,
}: {
  config: { onSuccess?: () => void; onError?: () => void }
}) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError } = config

  return useMutation({
    mutationFn: (profile: Omit<CreateProfile, 'id'>) => profileApi.createMe(profile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getProfileMeOptions().queryKey })
      onSuccess?.()
    },
    onError: () => {
      onError?.()
    },
  })
}

export const useUpdateProfileMe = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (profile: UpdateProfile) => profileApi.updateMe(profile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getProfileMeOptions().queryKey })
    },
  })
}
