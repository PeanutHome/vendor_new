'use client';

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";


console.log('🚀 VendorSidebar component imported');


const menuItems = [
	{
		label: "Products",
		href: "/dashboard/products",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="w-5 h-5 mr-3"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
			>
				<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
				<path d="M12 22V12" />
				<path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7" />
				<path d="m7.5 4.27 9 5.15" />
			</svg>
		),
	},
	{
		label: "Inventory",
		href: "/dashboard/inventory",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="w-5 h-5 mr-3"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
			>
				<path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
				<path d="M6 18h12" />
				<path d="M6 14h12" />
				<rect width="12" height="12" x="6" y="10" />
			</svg>
		),
	},
	// {
	// 	label: "Analytics",
	// 	href: "/dashboard/analytics",
	// 	icon: (
	// 		<svg
	// 			xmlns="http://www.w3.org/2000/svg"
	// 			className="w-5 h-5 mr-3"
	// 			fill="none"
	// 			viewBox="0 0 24 24"
	// 			stroke="currentColor"
	// 			strokeWidth={2}
	// 		>
	// 			<path d="M3 3v16a2 2 0 0 0 2 2h16" />
	// 			<path d="M18 17V9" />
	// 			<path d="M13 17V5" />
	// 			<path d="M8 17v-3" />
	// 		</svg>
	// 	),
	// },
	// {
	// 	label: "Shop Settings",
	// 	href: "/dashboard/shop-settings",
	// 	icon: (
	// 		<svg
	// 			xmlns="http://www.w3.org/2000/svg"
	// 			className="w-5 h-5 mr-3"
	// 			fill="none"
	// 			viewBox="0 0 24 24"
	// 			stroke="currentColor"
	// 			strokeWidth={2}
	// 		>
	// 			<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
	// 			<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
	// 			<path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
	// 			<path d="M2 7h20" />
	// 			<path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
	// 		</svg>
	// 	),
	// },
	// {
	// 	label: "Notifications",
	// 	href: "/dashboard/notifications",
	// 	icon: (
	// 		<svg
	// 			xmlns="http://www.w3.org/2000/svg"
	// 			className="w-5 h-5 mr-3"
	// 			fill="none"
	// 			viewBox="0 0 24 24"
	// 			stroke="currentColor"
	// 			strokeWidth={2}
	// 		>
	// 			<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
	// 			<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
	// 		</svg>
	// 	),
	// },
];

function SidebarMenu({ items, onNavigate }: { items: typeof menuItems; onNavigate: () => void }) {
	const pathname = usePathname();
	const router = useRouter();
	return (
		<ul className="flex w-full min-w-0 flex-col gap-1">
			{items.map((item) => (
				<li key={item.label} className="group/menu-item relative">
					<button
						type="button"
						className={`peer/menu-button flex items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none transition-colors focus-visible:ring-2 h-10 text-sm w-full justify-start ${
							pathname === item.href
								? "bg-[#00B14F]/10 text-[#00B14F] border-r-2 border-[#00B14F] font-medium"
								: "text-gray-700 hover:bg-gray-100"
						}`}
						onClick={() => {
							router.push(item.href);
							onNavigate();
						}}
						aria-current={pathname === item.href ? "page" : undefined}
					>
						{item.icon}
						<span className="truncate font-medium">{item.label}</span>
					</button>
				</li>
			))}
		</ul>
	);
}

function SidebarProfile({ user, onLogout }: { user: any; onLogout: () => void }) {
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	
	const handleLogout = async () => {
		if (isLoggingOut) return;
		
		setIsLoggingOut(true);
		try {
			// Logout locally - no API call needed
			console.log('📤 Logging out locally...');
		} catch (error) {
			console.error('❌ Logout error:', error);
		} finally {
			// Always logout locally
			onLogout();
			setIsLoggingOut(false);
		}
	};

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map(word => word.charAt(0))
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	const initials = user?.username ? getInitials(user.username) : 'U';
	const displayName = user?.username || 'User';
	const displayEmail = user?.email || 'user@example.com';
	const displayRole = user?.role || 'Vendor';

	return (
		<div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-3">
			{/* User Profile Info */}
			<div className="flex items-center gap-3 p-3 rounded-md bg-gray-50">
				<span className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 bg-muted">
					<span className="flex h-full w-full items-center justify-center rounded-full bg-[#00B14F] text-sm font-semibold text-white">
						{initials}
					</span>
				</span>
				<div className="text-left flex-1 min-w-0">
					<p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
					<p className="text-xs text-gray-600 truncate">{displayEmail}</p>
					<p className="text-xs text-[#00B14F] font-medium capitalize">{displayRole}</p>
				</div>
			</div>
			
			{/* Logout Button */}
			<button 
				onClick={handleLogout}
				disabled={isLoggingOut}
				className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isLoggingOut ? (
					<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				) : (
					<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
					</svg>
				)}
				{isLoggingOut ? 'Logging out...' : 'Logout'}
			</button>
		</div>
	);
}

export default function VendorSidebar() {
	console.log('🚀 VendorSidebar component rendering...');
	
	const [open, setOpen] = useState(false);
	const drawerRef = useRef<HTMLDivElement>(null);
	const { user, logout } = useAuthStore();
	const router = useRouter();

	// Log when component mounts
	useEffect(() => {
		console.log('✅ VendorSidebar component mounted successfully');
	}, []);

	// Accessibility: close on ESC, trap focus
	useEffect(() => {
		if (!open) return;
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [open]);

	useEffect(() => {
		if (!open || !drawerRef.current) return;
		const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
			'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
		);
		if (focusable.length) focusable[0].focus();
		function trap(e: KeyboardEvent) {
			if (e.key !== "Tab") return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
		document.addEventListener("keydown", trap);
		return () => document.removeEventListener("keydown", trap);
	}, [open]);

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) setOpen(false);
	};

	const handleLogout = () => {
		console.log('🚪 Logging out user...');
		logout();
		router.push('/');
	};

	return (
		<>
			{/* Mobile Nav Toggle Button */}
			<button
				className="md:hidden fixed bottom-4 left-4 z-50 bg-[#00B14F] text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00B14F]"
				onClick={() => setOpen((v) => !v)}
				aria-label="Open sidebar menu"
				aria-expanded={open}
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>

			{/* Overlay for mobile drawer */}
			{open && (
				<div
					className="fixed inset-0 z-30 bg-black/30 md:hidden animate-fadeIn"
					onClick={handleOverlayClick}
					aria-hidden="true"
				/>
			)}

			{/* Sidebar Drawer */}
			<aside
				ref={drawerRef}
				role="dialog"
				aria-modal="true"
				className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"} max-md:w-4/5 max-md:max-w-xs`}
			>
				{/* Close button for mobile */}
				<div className="md:hidden flex justify-end p-4">
					<button onClick={() => setOpen(false)} aria-label="Close sidebar">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				
				{/* Sidebar Header */}
				<div className="flex flex-col gap-2 p-6 pt-0 md:pt-6">
					<h2 className="text-xl font-semibold" style={{ color: "#00B14F" }}>
						Vendor Panel
					</h2>
				</div>
				
				{/* Sidebar Content - Scrollable area */}
				<div className="flex-1 overflow-y-auto">
					<SidebarMenu items={menuItems} onNavigate={() => setOpen(false)} />
				</div>
				
				{/* Profile - Always visible at bottom */}
				{user && (
					<SidebarProfile user={user} onLogout={handleLogout} />
				)}
			</aside>
		</>
	);
}
