
interface HeaderParams {
  title: string,
}

export const Header = ({ title }: HeaderParams): JSX.Element => {
  return (
    <h1>{title}</h1>
  )
}
