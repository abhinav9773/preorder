"use client";

import { useState } from "react";
import { X, ChevronRight } from "lucide-react";

interface FormData {
  // Part 1
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  city: string;
  consent: boolean;

  // Part 2
  product: string;
  dogCount: string;
  breeds: string;
  ageWeightCategory: string;

  // Part 3
  primaryReason: string;
  otherReason: string;
  currentSmartCollar: string;
  currentBrand: string;
  preferredContact: string;
  betaTester: boolean;
  organizationAssociation: string;
  b2bContact: boolean;

  // Part 4
  priceRangeCollar1: string;
  priceRangeCollar2: string;
  referralSource: string;
  petFestMeeting: boolean;
}

interface WaitlistFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistForm({ isOpen, onClose }: WaitlistFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [documentId, setDocumentId] = useState<string | null>(null); // Store the MongoDB document ID
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    city: "",
    consent: false,
    product: "",
    dogCount: "",
    breeds: "",
    ageWeightCategory: "",
    primaryReason: "",
    otherReason: "",
    currentSmartCollar: "",
    currentBrand: "",
    preferredContact: "",
    betaTester: false,
    organizationAssociation: "",
    b2bContact: false,
    priceRangeCollar1: "",
    priceRangeCollar2: "",
    referralSource: "",
    petFestMeeting: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPetFest, setShowPetFest] = useState(false);

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const submitStepData = async (stepData: Partial<FormData>) => {
    try {
      const requestBody = {
        step: currentStep,
        documentId: documentId, // Pass the document ID for updates
        ...stepData,
      };

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to save data: ${response.status} ${response.statusText}`,
        );
      }

      const result = await response.json();

      // Store the document ID from the first step
      if (currentStep === 1 && result.entryId && !documentId) {
        setDocumentId(result.entryId);
      }

      return result;
    } catch (error) {
      console.error("Error saving step data:", error);
      throw error; // Re-throw to handle in handleNext
    }
  };
  const handleNext = async () => {
    if (!isStepValid()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let stepData = {};
      switch (currentStep) {
        case 1:
          stepData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            city: formData.city,
            consent: formData.consent,
          };
          break;
        case 2:
          stepData = {
            product: formData.product,
            dogCount: formData.dogCount,
            breeds: formData.breeds,
            ageWeightCategory: formData.ageWeightCategory,
          };
          break;
        case 3:
          stepData = {
            primaryReason: formData.primaryReason,
            otherReason: formData.otherReason,
            currentSmartCollar: formData.currentSmartCollar,
            currentBrand: formData.currentBrand,
            preferredContact: formData.preferredContact,
            betaTester: formData.betaTester,
            organizationAssociation: formData.organizationAssociation,
            b2bContact: formData.b2bContact,
          };
          break;
        case 4:
          stepData = {
            priceRangeCollar1: formData.priceRangeCollar1,
            priceRangeCollar2: formData.priceRangeCollar2,
            referralSource: formData.referralSource,
            petFestMeeting: formData.petFestMeeting,
          };
          break;
      }

      await submitStepData(stepData);
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        // Show PetFest popup instead of thank you
        setShowPetFest(true);
      }
    } catch (error) {
      console.error(`Failed to submit step ${currentStep}:`, error);
      // You could add a user-friendly error message here
      alert(`Failed to save your data. Please try again. Error: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAttempt = () => {
    setShowCloseConfirmation(true);
  };

  const handleConfirmClose = () => {
    setShowCloseConfirmation(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowCloseConfirmation(false);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.phoneNumber &&
          formData.email &&
          formData.city &&
          formData.consent
        );
      case 2:
        return (
          formData.product &&
          formData.dogCount &&
          (formData.dogCount === "0" ||
            (formData.breeds && formData.ageWeightCategory))
        );
      case 3:
        return (
          formData.primaryReason &&
          formData.preferredContact &&
          (formData.currentSmartCollar !== "Yes" || formData.currentBrand)
        );
      case 4:
        return (
          formData.priceRangeCollar1 &&
          formData.priceRangeCollar2 &&
          formData.referralSource
        );
      default:
        return false;
    }
  };

  // Handler for after PetFest
  const handlePetFestContinue = () => {
    setShowPetFest(false);
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      onClose();
    }, 5000);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {" "}
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">PREORDER NOW</h2>
          <button
            onClick={handleCloseAttempt}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Step {currentStep} of 4
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((currentStep / 4) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>
        {/* Form Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Personal Information & Consent
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {" "}
                <input
                  type="text"
                  placeholder="First Name"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 placeholder-gray-400"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 placeholder-gray-400"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                />
              </div>{" "}
              <input
                type="tel"
                placeholder="Phone Number (WhatsApp preferred)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 placeholder-gray-400"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData("phoneNumber", e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 placeholder-gray-400"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 placeholder-gray-400"
                value={formData.city}
                onChange={(e) => updateFormData("city", e.target.value)}
              />{" "}
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
                  checked={formData.consent}
                  onChange={(e) => updateFormData("consent", e.target.checked)}
                />
                <span className="text-sm text-gray-800">
                  I agree to receive updates, offers and calls/SMS from MyPerro.
                  I accept the{" "}
                  <a href="/privacy-policy" className="text-primary underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Product & Dogs
              </h3>{" "}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-800">
                  Which product are you joining the waiting list for?
                </label>
                <div className="space-y-3">
                  <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="product"
                      value="Collar A — GPS + Activity + Health"
                      checked={
                        formData.product ===
                        "Collar A — GPS + Activity + Health"
                      }
                      onChange={(e) =>
                        updateFormData("product", e.target.value)
                      }
                      className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 focus:ring-primary focus:ring-2"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">
                        Collar A — GPS + Activity + Health
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Complete health monitoring with GPS tracking, activity
                        metrics, and vital health indicators for comprehensive
                        pet care.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="product"
                      value="Collar B — GPS + Geofencing"
                      checked={
                        formData.product === "Collar B — GPS + Geofencing"
                      }
                      onChange={(e) =>
                        updateFormData("product", e.target.value)
                      }
                      className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 focus:ring-primary focus:ring-2"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">
                        Collar B — GPS + Geofencing
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Essential tracking solution with real-time GPS location
                        and customizable safe zone alerts to keep your pet
                        secure.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="product"
                      value="Both"
                      checked={formData.product === "Both"}
                      onChange={(e) =>
                        updateFormData("product", e.target.value)
                      }
                      className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 focus:ring-primary focus:ring-2"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">
                        Both Collars
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Get the complete MyPerro experience with both collar
                        options for maximum flexibility and features.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div>
                {" "}
                <label className="block text-sm font-medium mb-2 text-gray-800">
                  How many dogs do you have?
                </label>
                <select
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900"
                  value={formData.dogCount}
                  onChange={(e) => updateFormData("dogCount", e.target.value)}
                >
                  <option value="">Select Count</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3+">3+</option>
                </select>
              </div>
              {formData.dogCount !== "0" && formData.dogCount && (
                <>
                  {" "}
                  <input
                    type="text"
                    placeholder="Breed(s)"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 placeholder-gray-400"
                    value={formData.breeds}
                    onChange={(e) => updateFormData("breeds", e.target.value)}
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-800">
                      Dog age/weight category
                    </label>
                    <select
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900"
                      value={formData.ageWeightCategory}
                      onChange={(e) =>
                        updateFormData("ageWeightCategory", e.target.value)
                      }
                    >
                      <option value="">Select Category</option>
                      <option value="Puppy - Small">Puppy - Small</option>
                      <option value="Puppy - Medium">Puppy - Medium</option>
                      <option value="Puppy - Large">Puppy - Large</option>
                      <option value="Adult - Small">Adult - Small</option>
                      <option value="Adult - Medium">Adult - Medium</option>
                      <option value="Adult - Large">Adult - Large</option>
                      <option value="Senior - Small">Senior - Small</option>
                      <option value="Senior - Medium">Senior - Medium</option>
                      <option value="Senior - Large">Senior - Large</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Interest & Engagement
              </h3>
              <div>
                {" "}
                <label className="block text-sm font-medium mb-2 text-gray-800">
                  Primary reason for interest
                </label>
                <select
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900"
                  value={formData.primaryReason}
                  onChange={(e) =>
                    updateFormData("primaryReason", e.target.value)
                  }
                >
                  <option value="">Select Reason</option>
                  <option value="Tracking">Tracking</option>
                  <option value="Health monitoring">Health monitoring</option>
                  <option value="Boarding">Boarding</option>
                  <option value="Training">Training</option>
                  <option value="Security">Security</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {formData.primaryReason === "Other" && (
                <input
                  type="text"
                  placeholder="Please specify"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 placeholder-gray-400"
                  value={formData.otherReason}
                  onChange={(e) =>
                    updateFormData("otherReason", e.target.value)
                  }
                />
              )}{" "}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-800">
                  Do you currently use a smart collar?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="currentSmartCollar"
                      value="Yes"
                      checked={formData.currentSmartCollar === "Yes"}
                      onChange={(e) =>
                        updateFormData("currentSmartCollar", e.target.value)
                      }
                    />{" "}
                    <span className="ml-2 text-gray-800">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="currentSmartCollar"
                      value="No"
                      checked={formData.currentSmartCollar === "No"}
                      onChange={(e) =>
                        updateFormData("currentSmartCollar", e.target.value)
                      }
                    />
                    <span className="ml-2 text-gray-800">No</span>
                  </label>
                </div>
              </div>{" "}
              {formData.currentSmartCollar === "Yes" && (
                <input
                  type="text"
                  placeholder="Which brand?"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 placeholder-gray-400"
                  value={formData.currentBrand}
                  onChange={(e) =>
                    updateFormData("currentBrand", e.target.value)
                  }
                />
              )}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-800">
                  Preferred contact method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {" "}
                  {["WhatsApp", "Call", "Email", "SMS"].map((method) => (
                    <label key={method} className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={(e) =>
                          updateFormData("preferredContact", e.target.value)
                        }
                      />
                      <span className="ml-2 text-gray-800">{method}</span>
                    </label>
                  ))}
                </div>
              </div>{" "}
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
                  checked={formData.betaTester}
                  onChange={(e) =>
                    updateFormData("betaTester", e.target.checked)
                  }
                />
                <span className="text-sm text-gray-800">
                  Would you like to be a beta tester / pilot participant?
                </span>
              </label>
              <input
                type="text"
                placeholder="Are you associated with any organization (vet, kennel, rescue, military)?"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 placeholder-gray-400"
                value={formData.organizationAssociation}
                onChange={(e) =>
                  updateFormData("organizationAssociation", e.target.value)
                }
              />{" "}
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
                  checked={formData.b2bContact}
                  onChange={(e) =>
                    updateFormData("b2bContact", e.target.checked)
                  }
                />
                <span className="text-sm text-gray-800">
                  Yes — contact me for B2B/pilot
                </span>
              </label>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Preferences & Referral
              </h3>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-800">
                  Preferred price range - Collar 1 (GPS + Geofencing)
                </label>
                <select
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900"
                  value={formData.priceRangeCollar1}
                  onChange={(e) =>
                    updateFormData("priceRangeCollar1", e.target.value)
                  }
                >
                  <option value="">Select Price Range</option>
                  <option value="₹3,000–₹4,000">₹3,000–₹4,000</option>
                  <option value="₹4,000–₹5,000">₹4,000–₹5,000</option>
                  <option value="Above ₹5,000">Above ₹5,000</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-800">
                  Preferred price range - Collar 2 (GPS + Geofencing + Health
                  metrics)
                </label>
                <select
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900"
                  value={formData.priceRangeCollar2}
                  onChange={(e) =>
                    updateFormData("priceRangeCollar2", e.target.value)
                  }
                >
                  <option value="">Select Price Range</option>
                  <option value="₹5,000–₹6,000">₹5,000–₹6,000</option>
                  <option value="₹6,000–₹7,000">₹6,000–₹7,000</option>
                  <option value="Above ₹7,000">Above ₹7,000</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-800">
                  How did you hear about us?
                </label>
                <select
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900"
                  value={formData.referralSource}
                  onChange={(e) =>
                    updateFormData("referralSource", e.target.value)
                  }
                >
                  <option value="">Select Source</option>
                  <option value="PetFest">PetFest</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Friend">Friend</option>
                  <option value="Vet">Vet</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t">
          <button
            onClick={handleNext}
            disabled={!isStepValid() || isSubmitting}
            className="ml-auto flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Saving..."
              : currentStep === 4
                ? "Complete"
                : "Next"}
            {!isSubmitting && currentStep < 4 && (
              <ChevronRight className="w-4 h-4 ml-1" />
            )}{" "}
          </button>
        </div>
      </div>

      {/* PetFest Popup */}
      {showPetFest && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[120] p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <div className="text-center">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
                    checked={formData.petFestMeeting}
                    onChange={(e) => {
                      updateFormData("petFestMeeting", e.target.checked);
                      if (e.target.checked) {
                        window.location.href = "tel:9595514400";
                      }
                    }}
                  />
                  <span className="text-sm font-medium text-yellow-800">
                    I&apos;m at PetFest — meet me now (will call +91 9595514400)
                  </span>
                </label>
              </div>
              <button
                onClick={handlePetFestContinue}
                className="w-full px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-2"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Close Confirmation Dialog */}
      {showCloseConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mb-4">
                <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>{" "}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Wait! You&apos;re Almost There!
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You&apos;re just one step away from securing your spot for our
                  revolutionary smart collar! Don&apos;t miss this exclusive
                  opportunity to be among the first to experience the future of
                  pet care. Your furry friend deserves the best protection and
                  monitoring technology available.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCancelClose}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Continue & Complete
                </button>
                <button
                  onClick={handleConfirmClose}
                  className="px-4 py-3 text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  Leave Anyway
                </button>
              </div>
            </div>{" "}
          </div>
        </div>
      )}

      {/* Thank You Popup */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[130] p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Thank You!
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Thanks for joining our waitlist! We&apos;re excited to bring you
                the future of pet care. You&apos;ll be among the first to know
                when our revolutionary smart collar becomes available.
              </p>
              <div className="flex items-center justify-center space-x-2 text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
