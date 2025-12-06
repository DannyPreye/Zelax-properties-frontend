import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, blogPosts } from "@/lib/blog/posts";
import { getCategoryLabel } from "@/lib/blog/categories";
import { generateMetadata as createMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/seo/structured-data";
import Image from "next/image";
import { Calendar, Clock, User, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import BlogContent from "@/components/blog/blog-content";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return createMetadata({
            title: "Post Not Found",
            description: "The blog post you are looking for does not exist.",
        });
    }

    return createMetadata({
        title: post.title,
        description: post.excerpt,
        ogImage: post.image,
        ogType: "article",
        canonicalUrl: `/blog/${slug}`,
    });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = blogPosts
        .filter((p) => p.category === post.category && p.slug !== post.slug)
        .slice(0, 3);

    return (
        <>
            <StructuredData
                type='Article'
                data={{
                    headline: post.title,
                    description: post.excerpt,
                    image: post.image,
                    datePublished: post.publishedAt,
                    dateModified: post.updatedAt,
                    authorName: post.author.name,
                }}
            />
            <article className='min-h-screen'>
                {/* Hero Section */}
                <section className='relative py-20 bg-primary/10'>
                    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                        <Link href='/blog'>
                            <Button variant='ghost' className='mb-8'>
                                <ArrowLeft className='mr-2 h-4 w-4' />
                                Back to Blog
                            </Button>
                        </Link>
                        <div className='max-w-3xl mx-auto'>
                            <Badge className='mb-4'>
                                {getCategoryLabel(post.category)}
                            </Badge>
                            <h1 className='text-4xl md:text-5xl font-bold mb-6'>
                                {post.title}
                            </h1>
                            <p className='text-xl text-muted-foreground mb-8'>
                                {post.excerpt}
                            </p>
                            <div className='flex flex-wrap items-center gap-6 text-muted-foreground'>
                                <div className='flex items-center'>
                                    <User className='h-5 w-5 mr-2' />
                                    <span>{post.author.name}</span>
                                </div>
                                <div className='flex items-center'>
                                    <Calendar className='h-5 w-5 mr-2' />
                                    <span>
                                        {new Date(
                                            post.publishedAt
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className='flex items-center'>
                                    <Clock className='h-5 w-5 mr-2' />
                                    <span>{post.readingTime} min read</span>
                                </div>
                                <Button variant='outline' size='sm'>
                                    <Share2 className='h-4 w-4 mr-2' />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Image */}
                <section className='py-8 bg-background'>
                    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='max-w-4xl mx-auto'>
                            <div className='relative h-[400px] md:h-[500px] rounded-lg overflow-hidden'>
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className='object-cover'
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className='py-12 bg-background'>
                    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='max-w-3xl mx-auto prose prose-lg dark:prose-invert'>
                            <BlogContent content={post.content} />
                        </div>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className='py-12 bg-muted/30'>
                        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                            <h2 className='text-3xl font-bold mb-8'>
                                Related Posts
                            </h2>
                            <div className='grid md:grid-cols-3 gap-6'>
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.slug}
                                        href={`/blog/${relatedPost.slug}`}
                                    >
                                        <Card className='overflow-hidden group cursor-pointer h-full'>
                                            <div className='relative h-48 overflow-hidden'>
                                                <Image
                                                    src={relatedPost.image}
                                                    alt={relatedPost.title}
                                                    fill
                                                    className='object-cover group-hover:scale-110 transition-transform duration-500'
                                                />
                                            </div>
                                            <CardContent className='p-6'>
                                                <Badge
                                                    variant='outline'
                                                    className='mb-2'
                                                >
                                                    {getCategoryLabel(
                                                        relatedPost.category
                                                    )}
                                                </Badge>
                                                <h3 className='text-xl font-semibold mb-2 line-clamp-2'>
                                                    {relatedPost.title}
                                                </h3>
                                                <p className='text-muted-foreground line-clamp-2'>
                                                    {relatedPost.excerpt}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </article>
        </>
    );
}
