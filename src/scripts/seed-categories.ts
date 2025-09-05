// TODO: Create a script to seed categories.
import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
    "Cars & Vehicles",
    "Comedy",
    "Education",
    "Entertainment",
    "Film & Animation",
    "Gaming",
    "Howto & Style",
    "Music",
    "News & Politics",
    "People & Blogs",
    "Pets & Animals",
    "Science & Technology",
    "Sports",
    "Travel & Events",
];

async function main() {
    console.log("Seeding categories...");

    try {
        const values = categoryNames.map((name) => ({
            name,
            description: `Videos related to ${name.toLowerCase()}`,
        }));

        await db.insert(categories).values(values);

        console.log("Categories seeded successfully.");

    } catch (error) {
        console.error("Error seeding categories:", error);
        process.exit(1);
    };
};
main();