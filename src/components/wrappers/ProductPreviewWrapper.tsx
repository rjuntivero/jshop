import { Product } from '@/types/Product';
import ProductPreview from '../ui/ProductPreview';

export default function ProductPreviewWrapper({ item }: { item: Product }) {
  return <ProductPreview product={item} />;
}
