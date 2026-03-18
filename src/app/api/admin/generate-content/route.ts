import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy", // Fallback to avoid crash on init if missing
});

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: "OPENAI_API_KEY çevre değişkeni bulunamadı. Lütfen .env dosyanızı kontrol edin." }, { status: 500 });
    }

    try {
        const { prompt, type } = await req.json();

        const systemPrompt = type === "blog" 
            ? "Sen uzman bir yazılım/teknoloji blog yazarısın. Verilen konuya göre SEO uyumlu, teknik detaylar içeren, akıcı bir Türkçe ile detaylı bir blog yazısı hazırla. Çıktıyı düz metin (text) veya Markdown olarak ver. Yalnızca makaleyi döndür, laf kalabalığı yapma."
            : "Sen uzman bir portfolyo / proje metin yazarısın. Verilen teknik ipuçlarına/başlığa göre yazılım projesi için etkileyici bir 'Problem' ve 'Çözüm' açıklaması (case study tadında) yaz. Çıktıyı Türkçe ver.";

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cost-effective model
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });

        return NextResponse.json({ result: response.choices[0].message.content });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
