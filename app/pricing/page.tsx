import type { Metadata } from 'next';
import { Check, Minus } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Pricing',
    description: 'Transparent pricing for web development services. Choose the package that fits your needs.',
};

const pricingPlans = [
    {
        name: 'Basic',
        price: '$500',
        description: 'Perfect for small businesses and personal projects',
        features: ['Responsive website (up to 5 pages)', 'Modern UI design', 'Mobile-friendly', 'Contact form integration', 'Basic SEO optimization', '1 month support', '2 rounds of revisions'],
        notIncluded: ['Custom backend', 'Database integration', 'Advanced features'],
        recommended: false,
    },
    {
        name: 'Standard',
        price: '$1,500',
        description: 'Ideal for growing businesses with custom requirements',
        features: ['Everything in Basic', 'Up to 10 custom pages', 'Database integration', 'User authentication', 'CMS/Admin panel', 'API development', 'Advanced SEO', '3 months support', '3 rounds of revisions'],
        notIncluded: ['E-commerce features', 'Third-party integrations'],
        recommended: true,
    },
    {
        name: 'Premium',
        price: '$3,000+',
        description: 'Complete solution for complex applications and SaaS',
        features: ['Everything in Standard', 'Unlimited pages', 'Full-stack application', 'E-commerce capabilities', 'Payment gateway integration', 'Third-party API integrations', 'Real-time features', 'Analytics dashboard', 'Cloud deployment (AWS/Vercel)', '6 months support', 'Unlimited revisions'],
        notIncluded: [],
        recommended: false,
    },
];

export default function PricingPage() {
    return (
        <div className="container mx-auto px-6 pt-32 pb-24 max-w-7xl">
            {/* Header */}
            <div className="mb-16 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">Pricing</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Transparent, fair pricing for quality web development services.
                    All packages include source code and deployment assistance.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {pricingPlans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative rounded-2xl border-2 p-8 bg-card transition-all duration-300 ${plan.recommended
                            ? 'border-primary shadow-lg shadow-primary/10 scale-[1.02]'
                            : 'border-border hover:border-primary/50'
                            }`}
                    >
                        {plan.recommended && (
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-5 py-1 rounded-full text-sm font-bold">
                                Recommended
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <p className="text-muted-foreground text-sm">{plan.description}</p>
                        </div>

                        <div className="mb-8">
                            <div className="text-4xl font-extrabold text-foreground">{plan.price}</div>
                            {plan.name !== 'Premium' && (
                                <div className="text-sm text-muted-foreground mt-1">One-time payment</div>
                            )}
                        </div>

                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start text-sm">
                                    <span className="p-0.5 rounded-full bg-primary/10 text-primary mr-2.5 mt-0.5 shrink-0">
                                        <Check className="h-3 w-3" />
                                    </span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {plan.notIncluded.length > 0 && (
                            <div className="mb-6 pt-5 border-t border-border">
                                <p className="text-xs text-muted-foreground mb-2 font-semibold">Not included:</p>
                                <ul className="space-y-2">
                                    {plan.notIncluded.map((feature) => (
                                        <li key={feature} className="flex items-start text-xs text-muted-foreground">
                                            <Minus className="h-3 w-3 mr-2 mt-0.5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Link
                            href="/contact"
                            className={`block w-full text-center py-3.5 rounded-xl font-bold transition-all duration-300 ${plan.recommended
                                ? 'bg-primary text-primary-foreground hover:bg-[var(--shift-hover)]'
                                : 'bg-secondary text-secondary-foreground border border-border hover:border-primary hover:text-primary'
                                }`}
                        >
                            Get Started
                        </Link>
                    </div>
                ))}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <div className="rounded-2xl border border-border bg-card p-8">
                    <h3 className="text-xl font-bold mb-3">Custom Projects</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        Need something specific? I offer custom development services tailored to your unique requirements.
                        Pricing is based on project scope, complexity, and timeline.
                    </p>
                    <Link href="/contact" className="text-sm font-semibold text-primary hover:text-[var(--shift-hover)] transition-colors duration-300">
                        Request a quote →
                    </Link>
                </div>

                <div className="rounded-2xl border border-border bg-card p-8">
                    <h3 className="text-xl font-bold mb-3">Hourly Rate</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        For ongoing work, maintenance, or consulting, I offer hourly billing at <strong className="text-foreground">$50/hour</strong>.
                        Perfect for small updates, bug fixes, or technical consulting.
                    </p>
                    <Link href="/contact" className="text-sm font-semibold text-primary hover:text-[var(--shift-hover)] transition-colors duration-300">
                        Hire me hourly →
                    </Link>
                </div>
            </div>

            {/* FAQ */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { question: 'What payment methods do you accept?', answer: 'I accept bank transfers, PayPal, and cryptocurrency. Payment terms are typically 50% upfront and 50% upon completion.' },
                        { question: 'How long does a project take?', answer: 'Basic projects take 1-2 weeks, Standard projects 3-4 weeks, and Premium projects 6-8 weeks depending on complexity.' },
                        { question: 'Do you provide hosting?', answer: 'I can help set up hosting on platforms like Vercel (free tier) or AWS. Hosting costs are separate from development fees.' },
                        { question: 'What about revisions?', answer: 'Each package includes a set number of revision rounds. Additional revisions can be purchased separately.' },
                        { question: 'Do I own the source code?', answer: 'Yes! Upon final payment, you receive full ownership of the source code and all related assets.' },
                        { question: 'What happens after the support period?', answer: 'You can purchase extended support or hire me on an hourly basis for maintenance and updates.' },
                    ].map((faq) => (
                        <div key={faq.question} className="rounded-xl border border-border bg-card p-6">
                            <h4 className="font-bold mb-2">{faq.question}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <div className="text-center rounded-2xl bg-primary text-primary-foreground p-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-lg mb-8 text-primary-foreground/70 max-w-2xl mx-auto">
                    Let&apos;s discuss your project requirements and find the perfect solution for your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center bg-primary-foreground text-primary px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity"
                    >
                        Contact Me
                    </Link>
                    <Link
                        href="https://wa.me/923440787723"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center border-2 border-primary-foreground/30 text-primary-foreground px-6 py-3.5 rounded-xl font-bold hover:bg-primary-foreground/10 transition-colors duration-300"
                    >
                        WhatsApp Me
                    </Link>
                </div>
            </div>
        </div>
    );
}
