import Link from "next/link";
import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#071910] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
            Catalog health for Shopify merchants running Google Shopping. Built by Skuform Commerce.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Product</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <Link className="hover:text-white" href="/app">
                Open app
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/#pricing">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/fix/missing-gtin-shopify">
                Fix guides
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <Link className="hover:text-white" href="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/terms">
                Terms of Service
              </Link>
            </li>
            <li>
              <a className="hover:text-white" href="mailto:hello@shelfcheck.io">
                hello@shelfcheck.io
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/40">
          © {new Date().getFullYear()} Skuform Commerce. ShelfCheck does not guarantee Merchant Center
          approval — Google decides that.
        </p>
      </div>
    </footer>
  );
}
