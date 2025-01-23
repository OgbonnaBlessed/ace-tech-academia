import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
      <p>&copy; 2025 ACE TECH ACADEMIA. All Rights Reserved.</p>
      <div className='footer__links'>
        {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
            <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                scroll={false}
                className='footer__link'
            >
                {item}
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Footer
