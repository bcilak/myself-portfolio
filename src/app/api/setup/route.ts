import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function GET() {
    try {
        await dbConnect();

        // Veritabanında daha önce hiç kullanıcı var mı diye kontrol et
        const userCount = await User.countDocuments();

        if (userCount > 0) {
            return NextResponse.json(
                { message: "Kurulum zaten yapıldı. Admin kullanıcısı mevcut." },
                { status: 400 }
            );
        }

        // Şifreyi hashle
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash("admin123", salt);

        // Yeni admin kullanıcısını oluştur
        const newUser = await User.create({
            username: "admin",
            passwordHash: passwordHash,
        });

        return NextResponse.json(
            {
                message: "Başarılı! İlk yönetici hesabınız oluşturuldu.",
                Kullanici: "admin",
                Sifre: "admin123",
                Not: "Lütfen giriş yaptıktan sonra bu bilgiyi kimseyle paylaşmayın!"
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Hata oluştu", error: (error as Error).message },
            { status: 500 }
        );
    }
}
