import { Animal } from '@prisma/client';
import DogDisplay from './DogDisplay';

type AnimalCardProps = {
  name: string;
  birthday?: Date;
  category?: string;
  status?: string;
  modifiedAt?: Date;
  createdAt?: Date;
};

const AnimalCard = (props: AnimalCardProps) => {
  const { name, birthday, category, status, modifiedAt, createdAt } = props;

  const daysOld = birthday
    ? Math.floor(
        (new Date().getTime() - birthday.getTime()) / (1000 * 3600 * 24)
      )
    : undefined;

  return (
    <div className="lg:w-80 ">
      <div className="w-28 translate-y-2">
        <DogDisplay />
      </div>
      <div className="p-5 border rounded-3xl flex flex-col gap-2 bg-muted">
        <div className="flex flex-row gap-2 items-center">
          <div className="text-2xl font-thin">{name}</div>
          {category && (
            <div className="text-sm font-medium bg-foreground text-background  px-3 p-1 rounded-full">
              {category}
            </div>
          )}
        </div>
        {/* TODO: Change color based on status */}
        {status && (
          <div className="text-sm font-medium bg-primary w-fit px-3 p-1 rounded-full">
            {status}
          </div>
        )}
        <div>
          <div className="text-sm text-muted-foreground font-medium">
            {daysOld} days old
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground font-medium">
            Added to Foster Finder on {createdAt?.toDateString()}
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            Last Updated: {modifiedAt?.toDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

AnimalCard.displayName = 'AnimalCard';

export { AnimalCard, type AnimalCardProps };
