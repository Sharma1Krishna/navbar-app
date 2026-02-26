 export const menuItems = [
    { name: 'Home', path: '/home' },
    {
      name: 'Products',
      path: '/products',
      children: [
        { name: 'Software', path: '/software' },
        { name: 'Hardware', path: '/hardware' },
        { name: 'Accessories', path: '/accessories' }
      ]
    },
    {
      name: 'Solutions',
      path: '/solutions',
      children: [
        { name: 'Enterprise', path: '/enterprise' },
        { name: 'Small Business', path: '/small-business' },
        { name: 'Startups', path: '/startups' }
      ]
    },
    {
      name: 'Services',
      path: '/services',
      children: [
        { name: 'All Services', path: '/services' },
        { name: 'Consulting', path: '/consulting' },
        { name: 'Testimonials', path: '/testimonials' }
      ]
    },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    {
      name: 'About',
      path: '/about',
      children: [
        { name: 'Our Story', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Support Hub', path: '/support' }
      ]
    },
    {
      name: 'Resources',
      path: '/blog',
      children: [
        { name: 'Latest Articles', path: '/blog' },
        { name: 'FAQs', path: '/faq' },
        { name: 'Webinars', path: '/webinars' }
      ]
    },
    { name: 'Partners', path: '/partners' },
    { name: 'Contact', path: '/contact' }
  ];