interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<i key={i} className="fas fa-star text-yellow-500" />); // full star
    } else if (rating >= i - 0.5) {
      stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-500" />); // half star
    } else {
      stars.push(<i key={i} className="far fa-star text-yellow-500" />); // empty star
    }
  }

  return <div className="flex gap-1">{stars}</div>;
}
