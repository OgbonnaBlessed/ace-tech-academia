import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__container'>

        <div className='footer__brand'>
          <h2 className='text-xl font-bold'>ACE TECH ACADEMIA</h2>
          <p className='mt-2 text-sm text-gray-400'>
            Empowering your tech journey through quality learning. Build skills, grow confidence, and achieve excellence.
          </p>
        </div>

        <div className='footer__links-group'>
          <div>
            <h3 className='footer__title'>Company</h3>
            <ul>
              {["About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    scroll={false}
                    className='footer__link'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='footer__title'>Legal</h3>
            <ul>
              {["Privacy Policy", "Licensing"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    scroll={false}
                    className='footer__link'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='footer__social'>
          <h3 className='footer__title'>Follow Us</h3>
          <div className='flex gap-4 mt-2'>
            <Link href="#" className="footer__icon"><FaFacebookF /></Link>
            <Link href="#" className="footer__icon"><FaTwitter /></Link>
            <Link href="#" className="footer__icon"><FaLinkedinIn /></Link>
            <Link href="#" className="footer__icon"><FaInstagram /></Link>
          </div>
        </div>

      </div>

      <div className='mt-6 text-gray-500 text-xs border-t border-gray-700 pt-4 text-center'>
        &copy; 2025 ACE TECH ACADEMIA. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer