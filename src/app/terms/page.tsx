import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Terms() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-lg font-semibold">Business Advisor AI</span>
            </Link>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="text-muted-foreground mb-4">Last Updated: March 25, 2024</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Agreement to Terms</h2>
            <p>
              These Terms of Service govern your use of Business Advisor AI, accessible at businessadvisorai.com. By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Use License</h2>
            <p>
              Permission is granted to temporarily use Business Advisor AI for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by Business Advisor AI at any time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Disclaimer</h2>
            <p>
              The materials on Business Advisor AI are provided on an 'as is' basis. Business Advisor AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              Further, Business Advisor AI does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Limitations</h2>
            <p>
              In no event shall Business Advisor AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Business Advisor AI, even if Business Advisor AI or a Business Advisor AI authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            <p>
              Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Business Advisor AI could include technical, typographical, or photographic errors. Business Advisor AI does not warrant that any of the materials on its website are accurate, complete or current. Business Advisor AI may make changes to the materials contained on its website at any time without notice. However Business Advisor AI does not make any commitment to update the materials.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Links</h2>
            <p>
              Business Advisor AI has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Business Advisor AI of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Modifications</h2>
            <p>
              Business Advisor AI may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with 💙 to help small business owners make better decisions.
          </p>
        </div>
      </footer>
    </div>
  );
}
