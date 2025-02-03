"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

import LinkBuilderWithLocale from "./utility/LinkBuilderWithLocale";

const Header = ({
  variant = "default",
}: {
  variant?: "default" | "transparent" | "transparent-V2";
}) => {
  const [toggle, setToggle] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  async function ToggleSubMenu(e: any) {
    try {
      if (e.target.nextSibling.classList.contains("nav-show")) {
        e.target.nextSibling.classList.remove("nav-show");
      } else {
        e.target.nextSibling.classList.add("nav-show");
      }
    } catch (err) {}
  }

  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollTop > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = usePathname();
  const locale = useLocale();

  const t = useTranslations("navbar");

  // Get the path without any locale prefix
  const pathWithoutLocale = pathname.replace(/^\/(en|hr)/, '') || '/';

  return (
    <header
      className={`header-style 
           ${isSticky ? "sticky" : ""} 
           ${variant === "transparent" ? "herder-variant-three" : ""}
           ${variant === "transparent-V2" ? "herder-variant-two" : ""}
           `}
    >
      <div className="desktop-menu max-w-[1570px] mx-auto justify-between items-center xl:flex hidden">
        <div className="main-menu flex items-center ">
          <Link href="/" className="shrink-0">
            <Image
              alt="logo"
              width="100"
              height="70"
              className="max-w-[100px]"
              src="/assets/images/logo.png"
              priority
            />
          </Link>
          <div className="main-menu uppercase ml-4">
            <ul className="flex items-center nav-list">
              <li className="group/step-one">
                <Link href="/" className="nav-link">
                  {t("home")}
                </Link>
              </li>
              <li className="group/step-one">
                <Link href="/accommodation" className="nav-link">
                  {t("accommodation")}
                </Link>
              </li>
              <li className="group/step-one">
                <Link href="/tours" className="nav-link">
                  {t("tours")}
                </Link>
              </li>
              <li className="group/step-one">
                <Link href="/transfers" className="nav-link">
                  {t("transfers")}
                </Link>
              </li>
              <li className="group/step-one">
                <Link href="/for-renters" className="nav-link">
                  {t("for-renters")}
                </Link>
              </li>
              <li className="group/step-one">
                <Link
                  href="https://ursuscatering.hr"
                  className="nav-link"
                  target="_blank"
                >
                  {t("catering")}
                </Link>
              </li>
              <li className="group/step-one">
                <Link href="/about-us" className="nav-link">
                  {t("about-us")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-4">
          <div className="language-switcher flex items-center gap-2">
            <Link href={pathWithoutLocale} locale="en" className={`text-sm hover:text-primary transition-colors ${locale === 'en' ? 'font-bold' : ''}`}>
              EN
            </Link>
            <Link href={pathWithoutLocale} locale="hr" className={`text-sm hover:text-primary transition-colors ${locale === 'hr' ? 'font-bold' : ''}`}>
              HR
            </Link>
          </div>
          <Link href="/contact" className="btn_primary__v1 outlined">
            {t("contact")}
          </Link>
        </div>
      </div>

      {/* mobile menu */}
      <div className="mobile-menu xl:hidden flex justify-between items-center relative">
        <Link href="/" className="shrink-0 max-w-[100px]">
          <Image
            alt="logo"
            width="100"
            height="70"
            src="/assets/images/logo.png"
          />
        </Link>
        <div className="space-x-4 flex items-center">
          <button
            className={`hamburger ${toggle ? "hum-active" : ""}`}
            id="hamburger"
            onClick={() => setToggle(!toggle)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div
          id="mobile-menu"
          className={`mobil-menu ${toggle ? "mm-active" : ""}`}
        >
          <div className="language-switcher flex items-center gap-2 justify-center mb-6 mt-4">
            <Link 
              href={pathWithoutLocale}
              locale="en"
              className={`text-sm hover:text-primary transition-colors ${locale === 'en' ? 'font-bold' : ''}`}
              onClick={() => setToggle(false)}
            >
              EN
            </Link>
            <Link 
              href={pathWithoutLocale}
              locale="hr"
              className={`text-sm hover:text-primary transition-colors ${locale === 'hr' ? 'font-bold' : ''}`}
              onClick={() => setToggle(false)}
            >
              HR
            </Link>
          </div>
          <ul>
            <li className="group/step-one">
              <Link
                href="/"
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {t("home")}
              </Link>
            </li>
            <li className="group/step-one">
              <Link
                href="/accommodation"
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {t("accommodation")}
              </Link>
            </li>
            <li className="group/step-one">
              <Link
                href="/tours"
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {t("tours")}
              </Link>
            </li>
            <li className="group/step-one">
              <Link
                href="/transfers"
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {t("transfers")}
              </Link>
            </li>
            <li className="group/step-one">
              <Link
                href="/for-renters"
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {t("for-renters")}
              </Link>
            </li>
            <li className="group/step-one">
              <Link
                href="https://ursuscatering.hr"
                className="nav-link nav-link-sm"
                target="_blank"
                onClick={() => setToggle(false)}
              >
                {t("catering")}
              </Link>
            </li>
            <li className="group/step-one">
              <Link
                href="/about-us"
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {t("about-us")}
              </Link>
            </li>
            <li className="group/step-one">
              <Link
                href="/contact"
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {t("contact")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
