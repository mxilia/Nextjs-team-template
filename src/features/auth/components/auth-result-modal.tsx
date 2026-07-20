interface AuthResultModalProps {
  isSuccess: boolean
}

export const AuthResultModal = ({ isSuccess }: AuthResultModalProps) => {
  return <div>{isSuccess}</div>
}
