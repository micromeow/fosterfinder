import { LucideIcon } from 'lucide-react';
import { Icons } from '../icons';
import { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type CenterMessageProps = {
  iconVariant?: React.ReactElement;
} & HTMLAttributes<HTMLDivElement>;

function CenterMessage({
  iconVariant,
  className,
  children,
  ...divProps
}: PropsWithChildren<CenterMessageProps>) {
  return (
    <div
      className={cn(
        'w-full h-screen flex flex-col justify-center items-center',
        className
      )}
      {...divProps}
    >
      {iconVariant ?? <Icons.close width={50} height={50} />}
      <h3>{children}</h3>
    </div>
  );
}

CenterMessage.displayName = 'CenterMessage';

export { CenterMessage, type CenterMessageProps };
