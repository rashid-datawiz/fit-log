import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const Footer = () => {
    return (
        <footer className="border-t border-[#20242a] bg-[#090b0f]">
            <div className="mx-auto flex h-20 min-h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src={logo}
                        alt="FitLog"
                        width={44}
                        height={44}
                        className="h-11 w-11 object-contain"
                    />

                    <span className="text-lg font-black tracking-[-0.04em] text-white">
                        FIT<span className="text-[#CCFF00]">LOG</span>
                    </span>
                </Link>

                {/* Copyright */}
                <p className="text-right text-[11px] font-medium tracking-wide text-[#666c75]">
                    © 2026 FitLog — Workout Library.
                    <span className="hidden sm:inline"> Train hard, log honest.</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;