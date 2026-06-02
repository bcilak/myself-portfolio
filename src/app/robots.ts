import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/admin/", "/en/admin/"],
            },
        ],
        sitemap: "https://bariscilak.dev/sitemap.xml",
    };
}
