import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 25%, #1a1a1a 50%, #0f0f0f 75%, #0a0a0a 100%);
    background-attachment: fixed;
    color: #ffffff;
    overflow-x: hidden;
    min-height: 100vh;
    position: relative;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(240, 147, 251, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
    border: none;
    outline: none;
  }

  ul {
    list-style: none;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  /* Enhanced Glass morphism effect */
  .glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }

  .glass-strong {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 20px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
  }

  /* Enhanced Gradient text */
  .gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 200%;
    animation: gradientShift 3s ease infinite;
  }

  .gradient-text-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gradient-text-secondary {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gradient-text-accent {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Enhanced Hover effects */
  .hover-lift {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hover-lift:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
  }

  .hover-glow {
    transition: all 0.3s ease;
  }

  .hover-glow:hover {
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
    transform: scale(1.05);
  }

  .hover-scale {
    transition: transform 0.2s ease;
  }

  .hover-scale:hover {
    transform: scale(1.1);
  }

  .hover-bright {
    transition: all 0.3s ease;
  }

  .hover-bright:hover {
    filter: brightness(1.2);
    transform: translateY(-2px);
  }

  /* Responsive breakpoints */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    body {
      font-size: 13px;
    }
  }

  /* Enhanced Animation classes */
  .fade-in {
    animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .slide-in {
    animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .bounce-in {
    animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  .gradientShift {
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .float {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  /* Enhanced Loading spinner */
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Custom button styles */
  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.05);
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  /* Card styles */
  .card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 20px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
    background: rgba(255, 255, 255, 0.06);
  }

  /* Text utilities */
  .text-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  .text-glow {
    text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
  }

  /* Border utilities */
  .border-gradient {
    border: 2px solid;
    border-image: linear-gradient(135deg, #667eea, #764ba2) 1;
  }

  /* Focus styles */
  *:focus {
    outline: 2px solid rgba(102, 126, 234, 0.5);
    outline-offset: 2px;
  }

  /* Selection styles */
  ::selection {
    background: rgba(102, 126, 234, 0.3);
    color: white;
  }

  /* Smooth transitions for all elements */
  * {
    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  }
`;

export default GlobalStyles; 