import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql, Link } from "gatsby";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <div className="bg-gray-200 h-full min-h-screen">
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: "description",
              content: "Searches for hollow knight text assets",
            },
            { name: "keywords", content: "hollow knight, game" },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <div
          className="max-w-screen-lg w-9/12"
          style={{
            margin: "0 auto",
            padding: "0px 1.0875rem 1.45rem",
            paddingTop: 0,
          }}
        >
          <div className="h-20 m-auto font-light text-3xl py-3">
            <h1 style={{ margin: 0 }}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                }}
              >
                {data.site.siteMetadata.title}
              </Link>
            </h1>
          </div>
          {children}
        </div>
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
