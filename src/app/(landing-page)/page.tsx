import { StructuredData } from "@/components/seo/structured-data";
import { HomePageContent } from "@/components/pages/home-page-content";

export default function HomePage() {
    return (
        <>
            <StructuredData
                type='Organization'
                data={{
                    name: "Zelax Properties",
                    url: "https://zelax-properties.com",
                    description: "A comprehensive property rental platform",
                }}
            />
            <HomePageContent />
        </>
    );
}
