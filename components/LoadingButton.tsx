import { Loader } from 'lucide-react';
import { Button, ButtonProps } from './ui/button';

type LoadingButtonProps = {
  loading: boolean;
} & ButtonProps;
export default function LoadingButton({
  children,
  loading,
}: LoadingButtonProps) {
  return (
    <Button className="p-5">
      {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
