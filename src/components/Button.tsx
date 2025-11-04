import React from "react";
import { classNames } from "../helpers";

type ButtonProps = {
	children: React.ReactNode;
	href?: string;
	onClick?: () => void;
	download?: boolean;
	variant?: "primary" | "secondary" | "outline";
	size?: "sm" | "md" | "lg";
	className?: string;
};

export const Button = ({
	children,
	href,
	onClick,
	download = false,
	variant = "primary",
	size = "md",
	className = "",
}: ButtonProps) => {
	const baseClasses =
		"inline-flex items-center justify-center gap-2 font-medium transition-all rounded-xl shadow-sm text-center leading-normal";

	const variantClasses = {
		primary:
			"bg-[#00a0d1] text-white hover:bg-[#0088b2] focus:ring-2 focus:ring-[#00a0d1] focus:ring-offset-2",
		secondary:
			"bg-white text-[#00a0d1] border border-[#00a0d1] hover:bg-[#f0fbff] focus:ring-2 focus:ring-[#00a0d1] focus:ring-offset-2",
		outline:
			"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
	};

	const sizeClasses = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-5 py-2.5 text-lg",
	};

	const buttonClasses = classNames(
		baseClasses,
		variantClasses[variant],
		sizeClasses[size],
		className
	);

	if (href) {
		return (
			<a
				href={href}
				className={buttonClasses}
				download={download}
				onClick={onClick}
			>
				{children}
			</a>
		);
	}

	return (
		<button className={buttonClasses} onClick={onClick}>
			{children}
		</button>
	);
};
