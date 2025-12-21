"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";

type Props = {
  href?: string;
  label?: string;
} & ComponentPropsWithoutRef<"button">;

export function BackButton({
  href,
  label = "戻る",
  className = "",
  ...rest
}: Props) {
  const router = useRouter();

  const baseClasses = [
    "inline-flex items-center gap-2",
    "rounded-md border border-[var(--color-gray-200)]",
    "px-3 py-2 text-sm font-medium",
    "bg-white text-[var(--color-gray-900)] shadow-sm",
    "hover:bg-[var(--color-gray-50)] transition",
    "disabled:opacity-60 disabled:cursor-not-allowed",
  ].join(" ");

  const icon = (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="h-4 w-4 text-[var(--color-gray-600)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.5 4.5 7 10l5.5 5.5" />
    </svg>
  );

  if (href) {
    return (
      <Link
        href={href}
        prefetch={false}
        className={`${baseClasses} ${className}`}
        aria-label={label}
      >
        {icon}
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`${baseClasses} ${className}`}
      aria-label={label}
      {...rest}
    >
      {icon}
      {label}
    </button>
  );
}