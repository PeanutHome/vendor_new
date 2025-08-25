import React, { useState, useRef } from "react";

interface DocumentUploadsData {
	dicaCertificate?: File | null;
	tinCertificate?: File | null;
	nrcOrPassport?: File | null;
	businessLicense?: File | null;
	bankDocument?: File | null;
	authorizationLetter?: File | null;
}

const documents = [
	{
		key: "dicaCertificate" as keyof DocumentUploadsData,
		name: "DICA Certificate (Form 6/26)",
		required: "Yes",
		notes: "For registered companies",
	},
	{
		key: "tinCertificate" as keyof DocumentUploadsData,
		name: "TIN Certificate",
		required: "Yes",
		notes: "Issued by IRD",
	},
	{
		key: "nrcOrPassport" as keyof DocumentUploadsData,
		name: "NRC or Passport (of owner/representative)",
		required: "Yes",
		notes: "Required",
	},
	{
		key: "businessLicense" as keyof DocumentUploadsData,
		name: "Business License",
		required: "Conditional",
		notes: "If selling regulated products",
	},
	{
		key: "bankDocument" as keyof DocumentUploadsData,
		name: "Bank Document (Bank Book or Statement)",
		required: "Yes",
		notes: "For settlement",
	},
	{
		key: "authorizationLetter" as keyof DocumentUploadsData,
		name: "Authorization Letter",
		required: "Yes, if applicable",
		notes: "On company letterhead",
	},
];

export default function DocumentUploadsStep({
	value,
	onChange,
	onPrev,
	onNext,
}: {
	value: DocumentUploadsData;
	onChange: (data: DocumentUploadsData) => void;
	onPrev?: () => void;
	onNext?: () => void;
}) {
	const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
	const [dragStates, setDragStates] = useState<Record<string, boolean>>({});

	const handleFileSelect = (documentKey: keyof DocumentUploadsData, file: File | null) => {
		onChange({
			...value,
			[documentKey]: file,
		});
	};

	const handleFileInputChange = (documentKey: keyof DocumentUploadsData, event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		handleFileSelect(documentKey, file);
	};

	const handleDragOver = (e: React.DragEvent, documentKey: string) => {
		e.preventDefault();
		setDragStates(prev => ({ ...prev, [documentKey]: true }));
	};

	const handleDragLeave = (e: React.DragEvent, documentKey: string) => {
		e.preventDefault();
		setDragStates(prev => ({ ...prev, [documentKey]: false }));
	};

	const handleDrop = (e: React.DragEvent, documentKey: keyof DocumentUploadsData) => {
		e.preventDefault();
		setDragStates(prev => ({ ...prev, [documentKey]: false }));
		
		const files = e.dataTransfer.files;
		if (files.length > 0) {
			const file = files[0];
			// Validate file type
			const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
			if (allowedTypes.includes(file.type)) {
				handleFileSelect(documentKey, file);
			} else {
				alert('Please upload only PDF, JPG, or PNG files.');
			}
		}
	};

	const removeFile = (documentKey: keyof DocumentUploadsData) => {
		handleFileSelect(documentKey, null);
		// Reset file input
		if (fileInputRefs.current[documentKey]) {
			fileInputRefs.current[documentKey]!.value = '';
		}
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};
	return (
		<div className="space-y-6 bg-white">
			{/* Title and Security Notice */}
			<div className="flex flex-col space-y-1.5 p-6">
				<h3 className="font-semibold tracking-tight text-2xl">
					Step 5: Document Uploads
				</h3>
				<p className="text-muted-foreground text-lg">
					Upload clear PDF or JPG/PNG scans of the required documents. Your
					information is securely encrypted and used only for verification and
					compliance purposes.
				</p>
				<div className="flex items-center space-x-2 mt-2 bg-yellow-50 border border-yellow-200 rounded p-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="none"
						viewBox="0 0 24 24"
						stroke="#f59e42"
						strokeWidth="2"
						className="w-5 h-5"
					>
						<circle cx="12" cy="12" r="10" />
						<line x1="12" x2="12" y1="8" y2="12" />
						<line x1="12" x2="12.01" y1="16" y2="16" />
					</svg>
					<span className="text-sm text-yellow-800">
						All uploads are encrypted and reviewed only by our compliance team.
					</span>
				</div>
			</div>
			<div className="p-6 pt-0 space-y-6">
				{/* Document Uploads - Brand Information Style */}
				<div className="space-y-6">
					{documents.map((doc) => (
						<div
							key={doc.name}
							className="rounded-lg border bg-card text-card-foreground shadow-sm"
						>
							<div className="flex flex-col space-y-1.5 p-6">
								<h3 className="text-lg font-semibold leading-none tracking-tight flex items-center space-x-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="lucide lucide-image w-5 h-5"
									>
										<rect
											width="18"
											height="18"
											x="3"
											y="3"
											rx="2"
											ry="2"
										></rect>
										<circle cx="9" cy="9" r="2"></circle>
										<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
									</svg>
									<span>{doc.name}</span>
									{doc.required === "Yes" &&
										doc.name !== "Authorization Letter" && (
											<span className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors border-transparent bg-red-600 text-white text-xs ml-2">
												Required
											</span>
										)}
									{doc.required === "Conditional" && (
										<span className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors border-transparent bg-yellow-100 text-yellow-700 text-xs ml-2">
											Conditional
										</span>
									)}
									{doc.required === "Yes, if applicable" && (
										<span className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors border-transparent bg-blue-100 text-blue-700 text-xs ml-2">
											Yes, if applicable
										</span>
									)}
								</h3>
								<p className="text-sm text-muted-foreground">
									{doc.notes}
								</p>
							</div>
							<div className="p-6 pt-0 space-y-4">
								<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
									Upload Document
								</label>
								
								{/* Hidden file input */}
								<input
									type="file"
									ref={(el) => { fileInputRefs.current[doc.key] = el; }}
									onChange={(e) => handleFileInputChange(doc.key, e)}
									accept=".pdf,.jpg,.jpeg,.png"
									className="hidden"
									id={`file-${doc.key}`}
								/>
								
								{/* File upload area */}
								{!value[doc.key] ? (
									<div 
										className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
											dragStates[doc.key] 
												? 'border-[#00B14F] bg-[#00B14F]/5' 
												: 'border-gray-300 hover:border-[#00B14F] hover:bg-[#00B14F]/5'
										}`}
										onDragOver={(e) => handleDragOver(e, doc.key)}
										onDragLeave={(e) => handleDragLeave(e, doc.key)}
										onDrop={(e) => handleDrop(e, doc.key)}
										onClick={() => fileInputRefs.current[doc.key]?.click()}
									>
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
											className="lucide lucide-upload w-12 h-12 text-gray-400 mx-auto mb-4"
										>
											<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
											<polyline points="17 8 12 3 7 8"></polyline>
											<line x1="12" x2="12" y1="3" y2="15"></line>
										</svg>
										<p className="text-sm text-gray-600 mb-2">
											{dragStates[doc.key] ? 'Drop file here' : 'Drag & drop or click to upload'}
										</p>
										<p className="text-xs text-gray-500 mb-3">
											PDF, JPG, PNG (Max 10MB)
										</p>
										<button 
											type="button"
											className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 border border-input bg-background hover:bg-[#00B14F]/10 hover:text-[#00B14F] h-10 px-4 py-2"
										>
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
												className="lucide lucide-upload w-4 h-4 mr-2"
											>
												<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
												<polyline points="17 8 12 3 7 8"></polyline>
												<line x1="12" x2="12" y1="3" y2="15"></line>
											</svg>
											Choose File
										</button>
									</div>
								) : (
									/* File uploaded state */
									<div className="mt-2 border border-green-200 bg-green-50 rounded-lg p-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
													{value[doc.key]!.type.includes('pdf') ? (
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
															<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
															<polyline points="14,2 14,8 20,8"></polyline>
															<line x1="16" x2="8" y1="13" y2="13"></line>
															<line x1="16" x2="8" y1="17" y2="17"></line>
															<polyline points="10,9 9,9 8,9"></polyline>
														</svg>
													) : (
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
															<rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
															<circle cx="9" cy="9" r="2"></circle>
															<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
														</svg>
													)}
												</div>
												<div>
													<p className="text-sm font-medium text-green-800">{value[doc.key]!.name}</p>
													<p className="text-xs text-green-600">{formatFileSize(value[doc.key]!.size)}</p>
												</div>
											</div>
											<div className="flex items-center space-x-2">
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
													<path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
													<path d="m9 11 3 3L22 4"></path>
												</svg>
												<button
													type="button"
													onClick={() => removeFile(doc.key)}
													className="text-red-600 hover:text-red-800 p-1"
													title="Remove file"
												>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
														<path d="M3 6h18"></path>
														<path d="M19 6v14c0 1-1 2-2 2H7c-2 0-2-1-2-2V6"></path>
														<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
													</svg>
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
				{/* Navigation Buttons */}
				<div className="flex justify-between mt-8 pt-6 border-t">
					<button
						type="button"
						className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 border border-input bg-background hover:bg-[#00B14F]/10 hover:text-[#00B14F] h-10 px-4 py-2 text-[#00B14F]"
						onClick={onPrev}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-arrow-left w-4 h-4 mr-2"
						>
							<path d="m12 19-7-7 7-7"></path>
							<path d="M19 12H5"></path>
						</svg>
						Previous
					</button>
					<button
						type="button"
						className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 bg-[#00B14F] text-white hover:bg-[#00B14F]/90 h-10 px-4 py-2"
						onClick={onNext}
					>
						Next Step
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-arrow-right w-4 h-4 ml-2"
						>
							<path d="M5 12h14"></path>
							<path d="m12 5 7 7-7 7"></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
