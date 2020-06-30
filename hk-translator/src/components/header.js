import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <div className="py-3 px-4 mx-auto" style={{ maxWidth: 960 }}>
    <h1>
      <Link to="/" className="text-gray-700 text-4xl font-bold">
        {siteTitle}
      </Link>
    </h1>
  </div>
)

export default Header
