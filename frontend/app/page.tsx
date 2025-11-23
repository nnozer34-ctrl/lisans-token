import { Shield, Key, Wallet, ArrowRight, CheckCircle2, Zap, Globe, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="size-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">StellarLicense</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </a>
            <Link href="/license">
              <Button variant="outline" size="sm">
                Connect Wallet
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge className="w-fit">Powered by Stellar Blockchain</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
              Tokenized access control for the modern web
            </h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-xl">
              Securely manage digital licenses, subscriptions, and access rights through Stellar blockchain. Fast,
              transparent, and cost-effective licensing for your products.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/license">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <Card className="relative p-6 bg-card border-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Licenses</span>
                  <Badge variant="secondary">12,847</Badge>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Enterprise Plan", tokens: "1000 XLM", status: "Active" },
                    { name: "Pro Subscription", tokens: "250 XLM", status: "Active" },
                    { name: "API Access", tokens: "500 XLM", status: "Pending" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Key className="size-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.tokens}</p>
                        </div>
                      </div>
                      <Badge variant={item.status === "Active" ? "default" : "secondary"}>{item.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "$2.4M", label: "Total Value Locked", subtext: "in licenses" },
              { value: "99.9%", label: "Uptime", subtext: "on Stellar network" },
              { value: "15K+", label: "Active Licenses", subtext: "issued today" },
              { value: "<$0.01", label: "Transaction Cost", subtext: "per license" },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm font-medium text-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <Badge className="w-fit mx-auto">Features</Badge>
          <h2 className="text-4xl font-bold text-foreground text-balance">Everything you need for licensing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Built on Stellar for speed, security, and scalability. Manage your entire licensing infrastructure from one
            platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: "Secure & Transparent",
              description: "All licenses recorded on Stellar blockchain with complete transparency and immutability.",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Issue and verify licenses in 3-5 seconds with Stellar's high-performance network.",
            },
            {
              icon: Wallet,
              title: "Multi-Wallet Support",
              description: "Compatible with Freighter, Albedo, and all major Stellar wallets.",
            },
            {
              icon: Globe,
              title: "Global Payments",
              description: "Accept payments in XLM, USDC, and custom tokens for maximum flexibility.",
            },
            {
              icon: Lock,
              title: "Access Control",
              description: "Fine-grained permissions and role-based access for enterprise needs.",
            },
            {
              icon: Key,
              title: "API-First Design",
              description: "RESTful API and webhooks for seamless integration with your stack.",
            },
          ].map((feature, i) => (
            <Card key={i} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="w-fit mx-auto">How It Works</Badge>
            <h2 className="text-4xl font-bold text-foreground text-balance">Three steps to tokenized licensing</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create License Token",
                description: "Define your license parameters, pricing, and access rules on Stellar.",
              },
              {
                step: "02",
                title: "Users Purchase",
                description: "Customers buy licenses using XLM or USDC through their Stellar wallet.",
              },
              {
                step: "03",
                title: "Verify & Grant Access",
                description: "Automatically verify token ownership and grant access to your services.",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="space-y-4">
                  <div className="text-5xl font-bold text-primary/20">{item.step}</div>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-pretty">{item.description}</p>
                  <CheckCircle2 className="size-6 text-primary" />
                </div>
                {i < 2 && <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Card className="p-12 bg-primary text-primary-foreground border-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
          <div className="relative text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to revolutionize your licensing?</h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
              Join hundreds of companies using Stellar blockchain for secure, transparent, and cost-effective license
              management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="gap-2">
                Start Building <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                  <Shield className="size-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold text-foreground">StellarLicense</span>
              </div>
              <p className="text-sm text-muted-foreground">Tokenized access control powered by Stellar blockchain.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Use Cases
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Developers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 StellarLicense. Built on Stellar blockchain.
          </div>
        </div>
      </footer>
    </div>
  )
}
