'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"

interface LinkBuilderWithLocaleProps {
    path: string;
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function LinkBuilderWithLocale({ path, children, className, onClick }: LinkBuilderWithLocaleProps) {
    const locale = usePathname().split('/')[1]
    const sanitizedLocale = locale === 'hr' ? 'hr' : 'en';
    const sanitizedPath = path.replace(/^\/(hr|en)/, '');
    return (
        <Link href={`/${sanitizedLocale}${sanitizedPath}`} className={className} onClick={onClick}>
            {children}
        </Link>
    )
}
