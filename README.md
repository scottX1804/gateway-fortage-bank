# Gateway Fortage Bank - Secure Banking Portal

A modern, responsive banking portal built with HTML, CSS, and JavaScript.

## Features

- ✅ Responsive login interface
- ✅ Form validation
- ✅ Remember me functionality
- ✅ Modern gradient UI design
- ✅ Mobile-friendly layout
- ✅ Alert notifications

## Project Structure

```
gateway-fortage-bank/
├── index.html          # Main login page
├── css/
│   └── style.css       # Styling and responsive design
├── js/
│   └── script.js       # Login functionality and validation
└── README.md           # Project documentation
```

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/scottX1804/gateway-fortage-bank.git
   cd gateway-fortage-bank
   ```

2. Open `index.html` in your web browser:
   - Double-click the file, or
   - Use a local server (recommended):
     ```bash
     python -m http.server 8000
     # or
     npx http-server
     ```
   - Visit `http://localhost:8000`

### Deploy with GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Set source to `main` branch
3. Your site will be live at: `https://scottX1804.github.io/gateway-fortage-bank/`

## Security Considerations

⚠️ **Important:** This is a frontend-only template. For production use:

- **Never store credentials in frontend code**
- **Use HTTPS** for all connections
- **Implement backend authentication** (OAuth, JWT, etc.)
- **Follow PCI-DSS compliance** for financial data
- **Use secure headers** (HSTS, CSP, X-Frame-Options)
- **Validate input** on both frontend and backend
- **Use environment variables** for sensitive data
- **Implement rate limiting** on login attempts
- **Add two-factor authentication (2FA)**
- **Regular security audits** and penetration testing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Dashboard page
- [ ] Account management
- [ ] Transaction history
- [ ] Two-factor authentication
- [ ] Backend API integration
- [ ] Database setup
- [ ] Payment processing
- [ ] User profile management

## Development

### Adding Pages

Create new HTML files and link them in navigation. Example:
```html
<a href="dashboard.html">Dashboard</a>
```

### Styling Modifications

Edit `css/style.css` to customize:
- Colors and gradients
- Typography
- Spacing and layout
- Animations

### JavaScript Enhancements

Extend `js/script.js` to add:
- Real API calls
- Data validation
- Session management
- Error handling

## License

MIT License - Feel free to use this template for your projects.

## Support

For issues or questions, open a GitHub issue or contact the repository maintainer.

---

**Last Updated:** 2026-06-22