export interface WaitlistEntry {
  _id?: string;
  step: number;
  
  // Step 1 - Personal Information
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  city?: string;
  consent?: boolean;
  
  // Step 2 - Product & Dogs
  product?: string;
  dogCount?: string;
  breeds?: string;
  ageWeightCategory?: string;
  
  // Step 3 - Interest & Engagement
  primaryReason?: string;
  otherReason?: string;
  currentSmartCollar?: string;
  currentBrand?: string;
  preferredContact?: string;
  betaTester?: boolean;
  organizationAssociation?: string;
  b2bContact?: boolean;
  
  // Step 4 - Preferences & Referral
  priceRangeCollar1?: string;
  priceRangeCollar2?: string;
  referralSource?: string;
  petFestMeeting?: boolean;
  
  // Metadata
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  completed: boolean;
  lastUpdated: Date;
}