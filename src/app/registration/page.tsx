"use client";

import { RegistrationNavBar } from "../components/NavBar";
import BusinessInformationStep from "./pages/BusinessInformationStep";
import OwnerRepresentativeStep from "./pages/OwnerRepresentativeStep";
import FinacialInformationsStep from "./pages/FinacialInformationsStep";

import ReviewSubmitStep from "./pages/ReviewSubmitStep";
import BusinessAddressStep from "./pages/BusinessAddressStep";
import ProductCategoriesStep from "./pages/ProductCategoriesStep";
import DocumentUploadsStep from "./pages/DocumentUploadsStep";
import PickupAddressesStep from "./pages/PickupAddressesStep";
import AgreementDeclarationsStep from "./pages/AgreementDeclarationsStep";
import { useState } from "react";

const initialFormData = {
	business: {
		businessNameEn: "",
		businessNameMm: "",
		businessType: "",
		registrationType: "",
		dicaNumber: "",
		tin: "",
		licenseNumber: "",
		establishmentDate: "",
		description: "",
		website: "",
	},
	owner: {
		fullName: "",
		designation: "",
		nrcOrPassportNumber: "",
		email: "",
		mobileNumber: "",
		alternateContact: "",
	},
	address: {
		locationName: "",
		fullAddress: "",
		city: "",
		region: "",
		postalCode: "",
	},
	categories: {
		productCategories: [],
	},
	documents: {
		dicaCertificate: null,
		tinCertificate: null,
		nrcOrPassport: null,
		businessLicense: null,
		bankDocument: null,
		authorizationLetter: null,
	},
	financial: {
		bankName: "",
		accountHolder: "",
		accountNumber: "",
		bankBranch: "",
		mobileWallet: "",
	},
	pickup: {
		pickupAddresses: [],
	},
	agreement: {
		termsAndConditionsAccepted: false,
		privacyPolicyAccepted: false,
		dataProcessingConsent: false,
		businessInformationAccuracy: false,
		documentAuthenticity: false,
		digitalSignature: "",
		signatureDate: "",
	},
};

function getStepCompletion(formData: Record<string, any>) {
	return {
		business: !!formData.business && Object.keys(formData.business).length > 0,
		owner: !!formData.owner && Object.keys(formData.owner).length > 0,
		address: !!formData.address && Object.keys(formData.address).length > 0,
		categories: !!formData.categories && Object.keys(formData.categories).length > 0,
		documents: !!formData.documents && Object.keys(formData.documents).length > 0,
		financial: !!formData.financial && Object.keys(formData.financial).length > 0,
		pickup: !!formData.pickup && Object.keys(formData.pickup).length > 0,
		agreement: !!formData.agreement && Object.keys(formData.agreement).length > 0,
	};
}

export default function RegistrationPage() {
	const [activeStep, setActiveStep] = useState("business");
	const [formData, setFormData] = useState<Record<string, any>>(initialFormData);
	const steps = [
		{ key: "business", label: "Business Information" },
		{ key: "owner", label: "Authorized Representative" },
		{ key: "address", label: "Business Address" },
		{ key: "categories", label: "Product Categories" },
		{ key: "documents", label: "Document Uploads" },
		{ key: "financial", label: "Financial Information" },
		{ key: "pickup", label: "Pickup Address(es)" },
		{ key: "agreement", label: "Agreement & Declarations" },
		// { key: "vendor", label: "Vendor Profile" }, // removed from flow
		{ key: "review", label: "Review & Submit" },
	];
	const currentStepIdx = steps.findIndex((s) => s.key === activeStep);
	const completion = getStepCompletion(formData);
	const completedSteps = Object.values(completion).filter(Boolean).length;
	const progressPercent = Math.round((completedSteps / (steps.length - 1)) * 100);

	return (
		<>
			<RegistrationNavBar />
			<div className="container mx-auto px-4 py-8 bg-[#f0fdf4]">
				<div className="max-w-6xl mx-auto bg-[#f0fdf4]">
					<div className="mb-8">
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm font-medium text-gray-600">Progress</span>
							<span className="text-sm font-medium text-gray-600">
								{progressPercent}%
							</span>
						</div>
						<div
							aria-valuemax={100}
							aria-valuemin={0}
							role="progressbar"
							data-state="determinate"
							data-max={100}
							className="relative w-full overflow-hidden rounded-full bg-[#e6f7ee] h-2"
						>
							<div
								data-state="determinate"
								data-max={100}
								className="h-full bg-[#00B14F] transition-all"
								style={{ width: `${progressPercent}%` }}
							></div>
						</div>
					</div>
					<div className="grid lg:grid-cols-4 gap-8">
						<div className="lg:col-span-1">
							<div className="rounded-lg border bg-card text-card-foreground shadow-sm sticky top-24">
								<div className="flex flex-col space-y-1.5 p-6">
									<h3 className="font-semibold tracking-tight text-lg">
										Registration Steps
									</h3>
									<p className="text-sm text-muted-foreground">
										Complete all steps to submit your application
									</p>
								</div>
								<div className="p-6 pt-0">
									<div className="space-y-2">
										{steps.map((step, idx) => {
											const isActive = activeStep === step.key;
											const isCompleted = idx < currentStepIdx;
											return (
												<button
													key={step.key}
													className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
														isActive
															? "bg-[#00B14F] text-white shadow-md ring-2 ring-[#00B14F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F]"
															: isCompleted
															? "bg-green-50 text-green-700 border border-green-200"
															: "text-gray-400 cursor-not-allowed"
													}`}
													onClick={() =>
														idx <= currentStepIdx && setActiveStep(step.key)
													}
													disabled={idx > currentStepIdx}
												>
													<div className="flex items-center space-x-2">
														{isCompleted ? (
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="24"
																height="24"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																strokeWidth="2"
																strokeLinecap="round"
																strokeLinejoin="round"
																className="lucide lucide-circle-check-big w-4 h-4 text-green-600"
															>
																<path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
																<path d="m9 11 3 3L22 4"></path>
															</svg>
														) : (
															<div
																className={`w-4 h-4 rounded-full border-2 ${
																	isActive
																		? "border-white bg-[#00B14F]"
																		: "border-gray-300"
																}`}
															></div>
														)}
														<div>
															<div className="font-medium text-sm">
																{step.label}
															</div>
														</div>
													</div>
												</button>
											);
										})}
									</div>
								</div>
							</div>
						</div>
						<div className="lg:col-span-3">
							<div className="space-y-6 bg-[#f0fdf4]">
								{activeStep === "business" && (
									<BusinessInformationStep
										value={formData.business as any}
										onChange={(data) => setFormData((f: any) => ({ 
											...f, 
											business: { ...f.business, ...data }
										}))}
										onNext={() => setActiveStep("owner")}
									/>
								)}
								{activeStep === "owner" && (
									<OwnerRepresentativeStep
										value={formData.owner as any}
										onChange={(data) => setFormData((f: any) => ({ 
											...f, 
											owner: { ...f.owner, ...data }
										}))}
										onPrev={() => setActiveStep("business")}
										onNext={() => setActiveStep("address")}
									/>
								)}
								{activeStep === "address" && (
									<BusinessAddressStep
										value={formData.address as any}
										onChange={(data) => setFormData((f: any) => ({ 
											...f, 
											address: { ...f.address, ...data }
										}))}
										onPrev={() => setActiveStep("owner")}
										onNext={() => setActiveStep("categories")}
									/>
								)}
								{activeStep === "categories" && (
									<ProductCategoriesStep
										value={formData.categories as any}
										onChange={(data) => setFormData((f: any) => ({ 
											...f, 
											categories: { ...f.categories, ...data }
										}))}
										onPrev={() => setActiveStep("address")}
										onNext={() => setActiveStep("documents")}
									/>
								)}
								{activeStep === "documents" && (
									<DocumentUploadsStep
										value={formData.documents as any}
										onChange={(data) => setFormData((f: any) => ({ 
											...f, 
											documents: { ...f.documents, ...data }
										}))}
										onPrev={() => setActiveStep("categories")}
										onNext={() => setActiveStep("financial")}
									/>
								)}
								{activeStep === "financial" && (
									<FinacialInformationsStep
										value={formData.financial as any}
										onChange={(data) => setFormData((f: any) => ({ 
											...f, 
											financial: { ...f.financial, ...data }
										}))}
										onPrev={() => setActiveStep("documents")}
										onNext={() => setActiveStep("pickup")}
									/>
								)}
								{activeStep === "pickup" && (
									<PickupAddressesStep
										value={formData.pickup as any}
										onChange={(data) => setFormData((f: any) => ({ 
											...f, 
											pickup: { ...f.pickup, ...data }
										}))}
										onPrev={() => setActiveStep("financial")}
										onNext={() => setActiveStep("agreement")}
									/>
								)}
								{activeStep === "agreement" && (
									<AgreementDeclarationsStep
										value={formData.agreement as any}
										onChange={(data) => setFormData((f: any) => ({ 
											...f, 
											agreement: { ...f.agreement, ...data }
										}))}
										onPrev={() => setActiveStep("pickup")}
										onNext={() => setActiveStep("review")}
									/>
								)}
								{activeStep === "review" && (
									<ReviewSubmitStep 
										onPrev={() => setActiveStep("agreement")} 
										formState={completion} 
										formData={formData}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
