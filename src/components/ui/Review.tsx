import { Review as ReviewType } from '@/types/Product';
import StarRating from './StarRating';

interface Props {
  review: ReviewType;
}

export default function Review({ review }: Props) {
  return (
    <article className="p-4 bg-white shadow-sm outline-1">
      <header className="flex gap-4">
        <h1>{review.reviewerName}</h1>
        <h1>{review.reviewerEmail}</h1>
        <p>{review.date}</p>
      </header>
      <div className="flex gap-2 items-center justify-start md:text-lg text-xs">
        <p>{review?.rating || 0}</p>
        <StarRating rating={review?.rating || 0} />
      </div>
      <p>{review.comment}</p>
    </article>
  );
}
