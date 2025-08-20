interface HeaderProps {
  text: string;
}

export default function Header({ text }: HeaderProps): JSX.Element {
  return (
    <header>
      <h1>{text}</h1>
    </header>
  );
}
