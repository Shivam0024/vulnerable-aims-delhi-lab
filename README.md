
# Vulnerable Hospital Management System

## IMPORTANT DISCLAIMER

This project contains **INTENTIONALLY VULNERABLE CODE** designed for educational purposes only. It demonstrates common web security vulnerabilities such as:

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Insecure Direct Object References
- Security Misconfigurations
- Authentication Bypasses

**DO NOT DEPLOY THIS APPLICATION IN A PRODUCTION ENVIRONMENT OR USE IT WITH REAL DATA.**

## About This Project

This is a deliberately insecure hospital management system inspired by AIMS Delhi that showcases various security vulnerabilities for educational purposes. Use it to learn about common web application security issues, how they can be exploited, and how to fix them.

## Security Vulnerabilities Demonstrated

### SQL Injection
- Patient search and registration forms contain unparameterized SQL queries
- Login form is vulnerable to authentication bypass

### Cross-Site Scripting (XSS)
- Reflected XSS via URL parameters
- Stored XSS via localStorage
- DOM-based XSS in search functionality

### Insecure Direct Object References
- Patient records accessible by changing IDs in URLs
- No proper authorization checks

### Other Vulnerabilities
- Weak authentication mechanisms
- Dangerous use of eval() and innerHTML
- CSRF vulnerabilities (no anti-CSRF tokens)
- Sensitive data exposure

## Learning Resources

To learn more about web application security, check out:
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

## Project Structure

The application includes:
- Patient management
- Doctor profiles
- Appointment scheduling
- Medical records
- Admin dashboard

## How to Use

This project is built with React, TypeScript, and Tailwind CSS.

### Starting the Development Server

```sh
npm run dev
```

## Can I Deploy This?

NO! This application is for educational purposes only and contains serious security vulnerabilities. It should only be run in a controlled, isolated environment.

## License

This project is available for educational use only.
