import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../prismic.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
const routes: prismic.ClientConfig["routes"] = config.routes;

/**
 * Creates a Prismic client for the project's repository.
 */
export const createClient = (configOverride: prismic.ClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions: {
      next: {
        tags: ["prismic"],
        revalidate: process.env.NODE_ENV === "production" ? 60 : 5,
      },
    },
    ...configOverride,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
};
