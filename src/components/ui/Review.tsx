import { Review as ReviewType } from '@/types/Product';
import StarRating from './StarRating';
import UserIcon from '../icons/UserIcon';

interface Props {
  review: ReviewType;
}

export default function Review({ review }: Props) {
  const isoDate = review.date;
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <article className="p-4 bg-white shadow-sm outline-1 flex flex-col gap-4">
      <header className="flex gap-4 items-center">
        <UserIcon />
        <h1>{review.reviewerName}</h1>
        {/* <h1>{review.reviewerEmail}</h1> */}
      </header>
      <div className="flex gap-2 items-center justify-start md:text-lg text-xs">
        <StarRating rating={review?.rating || 0} />
      </div>
      <p>{`Reviewed on ${formattedDate}`}</p>

      <p>{review.comment}</p>
    </article>
  );
}
