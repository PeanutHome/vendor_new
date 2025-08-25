import { API_CONFIG } from './config';

export interface VendorRegistrationData {
  // Business Info
  businessNameEnglish: string;
  businessNameMyanmar?: string;
  businessType: string;
  registrationType: string;
  dicaRegistrationNumber?: string;
  tinNumber?: string;
  businessLicenseNumber?: string;
  dateOfEstablishment?: string;
  businessDescription?: string;
  websiteOrSocialMedia?: string;
  
  // Owner Info
  fullName: string;
  designation?: string;
  nrcOrPassportNumber?: string;
  email: string;
  mobileNumber: string;
  alternateContact?: string;
  
  // Business Address
  addressLine1: string;
  addressLine2?: string;
  region: string;
  cityTownship: string;
  postalCode?: string;
  
  // Product Categories
  productCategories: string[];
  
  // Banking Payment
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  bankBranch?: string;
  mobileWallet?: string;
  
  // Pickup Addresses
  pickupAddresses: Array<{
    pickupLocationName: string;
    contactPerson: string;
    contactNumber: string;
    email?: string;
    fullAddress: string;
    townshipCity: string;
    region: string;
    postalCode?: string;
    pickupDaysAndTime?: string;
  }>;
  
  // Agreements
  termsAndConditionsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  dataProcessingConsent: boolean;
  businessInformationAccuracy: boolean;
  documentAuthenticity: boolean;
  digitalSignature?: string;
  signatureDate?: string;
  
  // Document Uploads (as separate fields)
  dicaCertificate?: File;
  tinCertificate?: File;
  nrcOrPassport?: File;
  businessLicense?: File;
  bankDocument?: File;
  authorizationLetter?: File;
}

export const useVendorRegistration = () => {

  // Test function to check if API is reachable
  const testApiConnection = async () => {
    try {
      console.log('🧪 Testing API connection...');
      const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('✅ API connection test successful:', response.status);
      return true;
    } catch (error) {
      console.log('❌ API connection test failed:', error);
      return false;
    }
  };

  // No longer needed since form now uses enum values directly
  // const mapBusinessType = (shortCode: string): string => {
  //   const mapping: Record<string, string> = {
  //     'sole': 'Sole Proprietorship',
  //     'partnership': 'Partnership', 
  //     'private': 'Private Co., Ltd.',
  //     'individual': 'Individual Seller'
  //   };
  //   return mapping[shortCode] || shortCode;
  // };

  // const mapRegistrationType = (shortCode: string): string => {
  //   const mapping: Record<string, string> = {
  //     'dica': 'DICA-Registered',
  //     'micro': 'Non-Registered Micro Seller',
  //     'ngo': 'NGO',
  //     'gov': 'Government Supplier'
  //   };
  //   return mapping[shortCode] || shortCode;
  // };

  // Helper function to map regions to valid Myanmar region enum values
  const mapToValidRegion = (region: string): string => {
    if (!region) return '';
    
    // Convert to lowercase for comparison
    const regionLower = region.toLowerCase();
    
    // Map common variations to valid Myanmar regions
    const regionMapping: Record<string, string> = {
      'yangon': 'Yangon',
      'mandalay': 'Mandalay',
      'naypyitaw': 'Naypyitaw',
      'naypyidaw': 'Naypyitaw',
      'bago': 'Bago',
      'magway': 'Magway',
      'magwe': 'Magway',
      'ayeyarwady': 'Ayeyarwady',
      'ayeyarwaddy': 'Ayeyarwady',
      'irrawaddy': 'Ayeyarwady',
      'rakhine': 'Rakhine',
      'arakan': 'Rakhine',
      'shan': 'Shan',
      'kachin': 'Kachin',
      'kayah': 'Kayah',
      'kayin': 'Kayin',
      'karen': 'Kayin',
      'chin': 'Chin',
      'mon': 'Mon',
      'tanintharyi': 'Tanintharyi',
      'taninthayi': 'Tanintharyi',
      'sagaing': 'Sagaing',
      // Handle invalid regions by defaulting to Yangon
      'pahang': 'Yangon', // Malaysian state -> default to Yangon
      'kuala lumpur': 'Yangon',
      'selangor': 'Yangon',
    };
    
    // Check if we have a mapping for this region
    if (regionMapping[regionLower]) {
      console.log(`Region mapped: "${region}" -> "${regionMapping[regionLower]}"`);
      return regionMapping[regionLower];
    }
    
    // If no mapping found, try to capitalize and hope it's valid
    const capitalized = region.charAt(0).toUpperCase() + region.slice(1).toLowerCase();
    console.log(`Region not mapped, using capitalized: "${region}" -> "${capitalized}"`);
    return capitalized;
  };

  // Helper function to validate and clean date strings
  const cleanDateString = (dateStr: string | undefined): string | undefined => {
    // Handle null, undefined, empty string, or whitespace-only strings
    if (!dateStr || typeof dateStr !== 'string' || dateStr.trim() === '') {
      console.log('Empty or invalid date field:', dateStr, '-> returning undefined');
      return undefined;
    }
    
    // Check for invalid date patterns like "0NaN-aN-aN", "Invalid Date", etc.
    if (dateStr.includes('NaN') || dateStr.includes('undefined') || dateStr.includes('null') || dateStr.includes('Invalid')) {
      console.warn('Invalid date format detected:', dateStr, '-> returning undefined');
      return undefined;
    }
    
    // Validate if it's a proper date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateStr)) {
      console.warn('Date format does not match YYYY-MM-DD:', dateStr, '-> returning undefined');
      return undefined;
    }
    
    // Check if it's a valid date by parsing it
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', dateStr, '-> returning undefined');
      return undefined;
    }
    
    console.log('Valid date:', dateStr);
    return dateStr;
  };

  const submitVendorRegistration = async (
    vendorData: VendorRegistrationData
  ): Promise<{ success: boolean; message?: string; error?: string; statusCode?: number; details?: any }> => {
    console.log('🚀 SUBMIT FUNCTION CALLED');
    try {
      // Create FormData to handle file uploads
      const formData = new FormData();

      // Create JSON data with proper enum values (already flat structure)
      const jsonData = {
        // Business Info
        businessNameEnglish: vendorData.businessNameEnglish,
        businessNameMyanmar: vendorData.businessNameMyanmar,
        businessType: vendorData.businessType,
        registrationType: vendorData.registrationType,
        dicaRegistrationNumber: vendorData.dicaRegistrationNumber,
        tinNumber: vendorData.tinNumber,
        businessLicenseNumber: vendorData.businessLicenseNumber,
        dateOfEstablishment: cleanDateString(vendorData.dateOfEstablishment),
        businessDescription: vendorData.businessDescription,
        websiteOrSocialMedia: vendorData.websiteOrSocialMedia,
        
        // Owner Info
        fullName: vendorData.fullName,
        designation: vendorData.designation,
        nrcOrPassportNumber: vendorData.nrcOrPassportNumber,
        email: vendorData.email,
        mobileNumber: vendorData.mobileNumber,
        alternateContact: vendorData.alternateContact,
        
        // Business Address
        addressLine1: vendorData.addressLine1,
        addressLine2: vendorData.addressLine2,
        region: mapToValidRegion(vendorData.region),
        cityTownship: vendorData.cityTownship,
        postalCode: vendorData.postalCode,
        
        // Product Categories
        productCategories: vendorData.productCategories,
        
        // Banking Payment
        bankName: vendorData.bankName,
        accountHolderName: vendorData.accountHolderName,
        accountNumber: vendorData.accountNumber,
        bankBranch: vendorData.bankBranch,
        mobileWallet: vendorData.mobileWallet,
        
        // Pickup Addresses
        pickupAddresses: vendorData.pickupAddresses.map((address: any) => ({
          pickupLocationName: address.pickupLocationName,
          contactPerson: address.contactPerson,
          contactNumber: address.contactNumber,
          email: address.email,
          fullAddress: address.fullAddress,
          townshipCity: address.townshipCity,
          region: mapToValidRegion(address.region),
          postalCode: address.postalCode,
          pickupDaysAndTime: address.pickupDaysAndTime,
        })),
        
        // Agreements
        termsAndConditionsAccepted: vendorData.termsAndConditionsAccepted,
        privacyPolicyAccepted: vendorData.privacyPolicyAccepted,
        dataProcessingConsent: vendorData.dataProcessingConsent,
        businessInformationAccuracy: vendorData.businessInformationAccuracy,
        documentAuthenticity: vendorData.documentAuthenticity,
        digitalSignature: vendorData.digitalSignature,
        signatureDate: cleanDateString(vendorData.signatureDate),
      };

      formData.append('vendorData', JSON.stringify(jsonData));

      // Add document files
      if (vendorData.dicaCertificate) {
        formData.append('dicaCertificate', vendorData.dicaCertificate);
      }
      if (vendorData.tinCertificate) {
        formData.append('tinCertificate', vendorData.tinCertificate);
      }
      if (vendorData.nrcOrPassport) {
        formData.append('nrcOrPassport', vendorData.nrcOrPassport);
      }
      if (vendorData.businessLicense) {
        formData.append('businessLicense', vendorData.businessLicense);
      }
      if (vendorData.bankDocument) {
        formData.append('bankDocument', vendorData.bankDocument);
      }
      if (vendorData.authorizationLetter) {
        formData.append('authorizationLetter', vendorData.authorizationLetter);
      }

      // Log what we're sending
      console.log('=== SENDING DATA ===');
      console.log('vendorData (JSON):', JSON.stringify(jsonData, null, 2));
      
      console.log('=== FILES ===');
      if (vendorData.dicaCertificate) {
        console.log('dicaCertificate:', vendorData.dicaCertificate.name, vendorData.dicaCertificate.type);
      }
      if (vendorData.tinCertificate) {
        console.log('tinCertificate:', vendorData.tinCertificate.name, vendorData.tinCertificate.type);
      }
      if (vendorData.nrcOrPassport) {
        console.log('nrcOrPassport:', vendorData.nrcOrPassport.name, vendorData.nrcOrPassport.type);
      }
      if (vendorData.businessLicense) {
        console.log('businessLicense:', vendorData.businessLicense.name, vendorData.businessLicense.type);
      }
      if (vendorData.bankDocument) {
        console.log('bankDocument:', vendorData.bankDocument.name, vendorData.bankDocument.type);
      }
      if (vendorData.authorizationLetter) {
        console.log('authorizationLetter:', vendorData.authorizationLetter.name, vendorData.authorizationLetter.type);
      }

      console.log('=== API URL ===');
      const fullUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VENDOR_REGISTER}`;
      console.log('🌐 Full URL:', fullUrl);
      console.log('🔑 Endpoint:', API_CONFIG.ENDPOINTS.VENDOR_REGISTER);

      const response = await fetch(fullUrl, {
        method: 'POST',
        body: formData,
      });

      console.log('Status Code:', response.status);
      console.log('Status Text:', response.statusText);

      // Always try to get the response body first
      const responseText = await response.text();
      let responseData = {};
      
      try {
        responseData = JSON.parse(responseText);
        console.log('✅ Response Data (JSON):', responseData);
        console.log('📋 Response Message:', (responseData as any).message);
        console.log('🚨 Response Error:', (responseData as any).error);
        console.log('🔢 Response Status Code:', (responseData as any).statusCode);
      } catch {
        console.log('⚠️ Response Text (not JSON):', responseText);
        responseData = { message: responseText };
      }

      if (!response.ok) {
        // Enhanced error logging for debugging
        console.log('❌ API Error Response:');
        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);
        console.log('Response Data:', responseData);
        console.log('Response Text:', responseText);
        
        // Extract error details from the API response
        const apiError = responseData as any;
        const errorMessage = apiError.message || apiError.error || responseText || `Registration failed with status: ${response.status}`;
        const errorDetails = {
          message: errorMessage,
          statusCode: apiError.statusCode || response.status,
          error: apiError.error || 'Unknown Error',
          details: apiError
        };
        
        console.log('🚨 Extracted Error Details:', errorDetails);
        throw new Error(JSON.stringify(errorDetails));
      }

      // Handle 204 No Content (success with no body)
      if (response.status === 204) {
        return { 
          success: true, 
          message: 'Vendor registration submitted successfully!' 
        };
      }

      // For other success responses, use the already parsed response data
      return { 
        success: true, 
        message: (responseData as any).message || 'Vendor registration submitted successfully!' 
      };

    } catch (error) {
      console.log('💥 Caught Error in submitVendorRegistration:', error);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Network error: Unable to reach the server' 
        };
      }
      
      // Try to parse the error message if it contains JSON error details
      if (error instanceof Error && error.message) {
        try {
          const errorDetails = JSON.parse(error.message);
          console.log('📋 Parsed Error Details:', errorDetails);
          
          return {
            success: false,
            error: errorDetails.message || errorDetails.error || 'Registration failed',
            statusCode: errorDetails.statusCode,
            details: errorDetails.details
          };
        } catch {
          // If parsing fails, use the original error message
          console.log('⚠️ Could not parse error message as JSON, using original:', error.message);
          return { 
            success: false, 
            error: error.message || 'Registration failed. Please try again.' 
          };
        }
      }
      
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed. Please try again.' 
      };
    }
  };

  return {
    submitVendorRegistration,
    testApiConnection,
  };
}; 