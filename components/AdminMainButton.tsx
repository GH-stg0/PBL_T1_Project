type ButtonProps = {
    children: React.ReactNode;
    className?: string;
}

export default function Button({ children, className = "" }: ButtonProps) {
    return (
    <button className={`px-4 py-2 rounded-lg transition ${className}`}>
        {children}
    </button>
    );
}