export interface PerfumeVariant {
  id: string;
  name: string; // e.g. "50 مل" or "100 مل"
  sizeMl: number;
  priceSAR: number;
  originalPriceSAR?: number;
  sku: string;
}

export interface OlfactoryNotes {
  top: string[]; // القمة العطرية
  heart: string[]; // قلب العطر
  base: string[]; // قاعدة العطر
}

export interface Perfume {
  id: string;
  nameAr: string;
  nameEn: string;
  tagline: string;
  concentration: 'Eau de Parfum' | 'Extrait de Parfum' | 'Elixir';
  category: 'all' | 'oriental' | 'amber' | 'floral' | 'private';
  categoryNameAr: string;
  shortDescription: string;
  fullStory: string;
  image: string;
  secondaryImage?: string;
  variants: PerfumeVariant[];
  notes: OlfactoryNotes;
  intensity: number; // 1 to 5
  longevity: string; // e.g. "12+ ساعة"
  sillage: string; // e.g. "فواح قوي"
  season: string; // e.g. "شتوي / مسائي"
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  cartItemId: string; // combination of perfumeId + variantId
  perfume: Perfume;
  variant: PerfumeVariant;
  quantity: number;
}

export type PaymentMethodType = 'credit_card' | 'apple_pay' | 'mada' | 'google_pay' | 'cod';

export interface CustomerOrderInfo {
  fullName: string;
  phone: string;
  city: string;
  district: string;
  addressDetails: string;
  giftWrapping: boolean;
  giftNote?: string;
  paymentMethod: PaymentMethodType;
  cardDetails?: {
    cardNumber: string;
    cardHolder: string;
    expiry: string;
    cvv: string;
  };
}

export interface OrderReceipt {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shipping: number;
  tax: number;
  total: number;
  customerInfo: CustomerCustomerInfoSummary;
  estimatedDelivery: string;
}

export interface CustomerCustomerInfoSummary {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethodTitle: string;
}
