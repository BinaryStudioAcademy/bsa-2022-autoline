export type ButtonPropsType = {
  className?: string;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | undefined;
};
