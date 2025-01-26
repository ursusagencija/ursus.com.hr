"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Link, usePathname } from "@/i18n/routing";

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
  // const locale = pathname.split("/")[1] === "hr" ? "hr" : "en";
  // console.log(locale);

  const t = useTranslations("navbar");

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
                {/* <LinkBuilderWithLocale path="/" className="nav-link">
                  {locale === "hr" ? "Naslovnica" : "Home"}
                </LinkBuilderWithLocale> */}
                <Link href="/" className="nav-link">
                  {t("home")}
                </Link>
              </li>
              <li className="group/step-one">
                {/* <LinkBuilderWithLocale
                  path={`/accommodation`}
                  className="nav-link"
                >
                  {locale === "hr" ? "Smještaj" : "Accommodation"}
                </LinkBuilderWithLocale> */}
                <Link href="/accommodation" className="nav-link">
                  {t("accommodation")}
                </Link>
              </li>
              <li className="group/step-one">
                {/* <LinkBuilderWithLocale path={`/tours`} className="nav-link">
                  {locale === "hr" ? "Ture" : "Tours"}
                </LinkBuilderWithLocale> */}
                <Link href="/tours" className="nav-link">
                  {t("tours")}
                </Link>
              </li>
              <li className="group/step-one">
                {/* <LinkBuilderWithLocale path={`/transfers`} className="nav-link">
                  {locale === "hr" ? "Transfer" : "Transfers"}
                </LinkBuilderWithLocale> */}
                <Link href="/transfers" className="nav-link">
                  {t("transfers")}
                </Link>
              </li>
              <li className="group/step-one">
                {/* <LinkBuilderWithLocale
                  path={`/for-renters`}
                  className="nav-link"
                >
                  {locale === "hr" ? "Za iznajmljivače" : "For renters"}
                </LinkBuilderWithLocale> */}
                <Link href="/for-renters" className="nav-link">
                  {t("for-renters")}
                </Link>
              </li>
              <li className="group/step-one">
                {/* <a
                  className="nav-link"
                  href="https://ursuscatering.hr"
                  target="_blank"
                >
                  Catering
                </a> */}
                <Link
                  href="https://ursuscatering.hr"
                  className="nav-link"
                  target="_blank"
                >
                  {t("catering")}
                </Link>
              </li>
              <li className="group/step-one">
                {/* <LinkBuilderWithLocale path={`/about-us`} className="nav-link">
                  {locale === "hr" ? "O nama" : "About Us"}
                </LinkBuilderWithLocale> */}
                <Link href="/about-us" className="nav-link">
                  {t("about-us")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="shrink-0">
          {/* <LinkBuilderWithLocale
            path={`/contact`}
            className="btn_primary__v1 outlined"
          >
            {locale === "hr" ? "Kontakt" : "Contact"}
          </LinkBuilderWithLocale> */}
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
          {/* <Link href="/login" className="shrink-0 inline-flex justify-center items-center bg-primary-2 rounded-full h-10 w-10 text-white">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link> */}
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
          <ul>
            <li className="group/step-one">
              {/* <LinkBuilderWithLocale
                path={`/`}
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {locale === "hr" ? "Naslovnica" : "Home"}
              </LinkBuilderWithLocale> */}
              <Link
                href="/"
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {t("home")}
              </Link>
            </li>
            <li className="group/step-one">
              {/* <LinkBuilderWithLocale
                path={`/accommodation`}
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {locale === "hr" ? "Smještaj" : "Accommodation"}
              </LinkBuilderWithLocale> */}
              <Link
                href="/accommodation"
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {t("accommodation")}
              </Link>
            </li>
            <li className="group/step-one">
              {/* <LinkBuilderWithLocale
                path={`/tours`}
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {locale === "hr" ? "Ture" : "Tours"}
              </LinkBuilderWithLocale> */}
              <Link
                href="/tours"
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {t("tours")}
              </Link>
            </li>
            <li className="group/step-one">
              {/* <LinkBuilderWithLocale
                path={`/transfers`}
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {locale === "hr" ? "Transfer" : "Transfers"}
              </LinkBuilderWithLocale> */}
              <Link
                href="/transfers"
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {t("transfers")}
              </Link>
            </li>
            <li className="group/step-one">
              {/* <LinkBuilderWithLocale
                path={`/for-renters`}
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {locale === "hr" ? "Za iznajmljivače" : "For renters"}
              </LinkBuilderWithLocale> */}
              <Link
                href="/for-renters"
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {t("for-renters")}
              </Link>
            </li>
            <li className="group/step-one">
              {/* <a
                className="nav-link nav-link-sm"
                href="https://ursuscatering.hr"
                target="_blank"
              >
                Catering
              </a> */}
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
              {/* <LinkBuilderWithLocale
                path={`/about-us`}
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {locale === "hr" ? "O nama" : "About Us"}
              </LinkBuilderWithLocale> */}
              <Link
                href="/about-us"
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {t("about-us")}
              </Link>
            </li>
            <li className="group/step-one">
              {/* <LinkBuilderWithLocale
                path={`/contact`}
                className="nav-link nav-link-sm"
                onClick={() => setToggle(false)}
              >
                {locale === "hr" ? "Kontakt" : "Contact"}
              </LinkBuilderWithLocale> */}
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
