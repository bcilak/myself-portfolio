import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import Message from "@/models/Message";
import { DeleteMessageButton, MarkReadButton } from "./ClientActionButtons";

export default async function AdminMessages({ params }: { params: Promise<{ locale: string }> }) {
    const session = await getServerSession(authOptions);
    const { locale } = await params;

    if (!session) {
        redirect(`/${locale}/admin/login`);
    }

    await dbConnect();
    const messages = await Message.find({}).sort({ createdAt: -1 }).lean();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gelen Kutusu</h1>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                {messages.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        Henüz hiç mesajınız yok.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {messages.map((msg: any) => (
                            <div key={msg._id.toString()} className={`p-6 transition-colors ${msg.status === 'unread' ? 'bg-cyan-50 dark:bg-cyan-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{msg.name}</h3>
                                            <span className="text-sm text-gray-500">&lt;{msg.email}&gt;</span>
                                            {msg.status === 'unread' && (
                                                <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 text-xs font-medium rounded-full">Yeni</span>
                                            )}
                                            <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString('tr-TR')}</span>
                                        </div>
                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{msg.subject || "(Konu Yok)"}</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-wrap">{msg.message}</p>
                                    </div>
                                    <div className="flex flex-col gap-2 shrink-0">
                                        {msg.status === 'unread' && (
                                            <MarkReadButton id={msg._id.toString()} />
                                        )}
                                        <DeleteMessageButton id={msg._id.toString()} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
