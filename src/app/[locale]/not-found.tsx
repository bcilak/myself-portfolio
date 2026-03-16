import { Link } from "@/i18n/routing";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center">
                <div className="text-8xl font-bold gradient-text mb-4">404</div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Page Not Found</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">The page you are looking for does not exist.</p>
                <Link
                    href="/"
                    className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
