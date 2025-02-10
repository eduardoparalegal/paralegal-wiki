import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AnimatedLogin.css';
import { authAPI } from '../../config/api';  // Asegúrate de que la ruta sea correcta

// Define API_URL
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://paralegal-wiki.onrender.com/api'  // URL de producción
  : 'http://localhost:5000/api';               // URL de desarrollo

const AnimatedLogin = () => {
  const canvasRef = useRef(null);
  const headerRef = useRef(null);
  const pointsRef = useRef([]);
  const ctxRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const widthRef = useRef(window.innerWidth);
  const heightRef = useRef(window.innerHeight);
  const animateHeaderRef = useRef(true);
  const requestRef = useRef();
  const isInitializedRef = useRef(false);

  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  class Circle {
    constructor(pos, rad, color) {
      this.pos = pos || { x: 0, y: 0 };
      this.radius = rad || 2;
      this.color = color || 'rgba(156,217,249,0.3)';
      this.active = 0;
    }

    draw() {
      if (!this.active || !ctxRef.current) return;
      ctxRef.current.beginPath();
      ctxRef.current.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
      ctxRef.current.fillStyle = `rgba(156,217,249,${this.active})`;
      ctxRef.current.fill();
    }
  }

  const getDistance = (p1, p2) => {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  };

  const initHeader = () => {
    if (!headerRef.current || !canvasRef.current || isInitializedRef.current) return;

    widthRef.current = window.innerWidth;
    heightRef.current = window.innerHeight;
    targetRef.current = { x: widthRef.current / 2, y: heightRef.current / 2 };

    headerRef.current.style.height = `${heightRef.current}px`;
    canvasRef.current.width = widthRef.current;
    canvasRef.current.height = heightRef.current;
    ctxRef.current = canvasRef.current.getContext('2d');

    pointsRef.current = [];
    const stepX = widthRef.current / 20;
    const stepY = heightRef.current / 20;

    for (let x = 0; x < widthRef.current; x += stepX) {
      for (let y = 0; y < heightRef.current; y += stepY) {
        const px = x + Math.random() * stepX;
        const py = y + Math.random() * stepY;
        const p = { x: px, originX: px, y: py, originY: py };
        pointsRef.current.push(p);
      }
    }

    pointsRef.current.forEach(point => {
      const closest = pointsRef.current
        .filter(p => p !== point)
        .sort((a, b) => getDistance(point, a) - getDistance(point, b))
        .slice(0, 5);
      point.closest = closest;
      point.circle = new Circle(point, 2 + Math.random() * 2);
    });

    isInitializedRef.current = true;
  };

  const mouseMove = (e) => {
    if (!headerRef.current) return;
    const posx = e.clientX;
    const posy = e.clientY;
    targetRef.current = { x: posx, y: posy };
  };

  const scrollCheck = () => {
    if (!headerRef.current) return;
    animateHeaderRef.current = document.body.scrollTop <= heightRef.current;
  };

  const resize = () => {
    if (!headerRef.current || !canvasRef.current) return;

    widthRef.current = window.innerWidth;
    heightRef.current = window.innerHeight;
    headerRef.current.style.height = `${heightRef.current}px`;
    canvasRef.current.width = widthRef.current;
    canvasRef.current.height = heightRef.current;

    isInitializedRef.current = false;
    initHeader();
  };

  const drawLines = (p) => {
    if (!p.active || !ctxRef.current || !p.closest) return;
    p.closest.forEach(closestPoint => {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(p.x, p.y);
      ctxRef.current.lineTo(closestPoint.x, closestPoint.y);
      ctxRef.current.strokeStyle = `rgba(156,217,249,${p.active})`;
      ctxRef.current.stroke();
    });
  };

  const shiftPoint = (p) => {
    if (!p) return;
    gsap.to(p, {
      duration: 1 + Math.random(),
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: "circ.inOut",
      onComplete: () => shiftPoint(p)
    });
  };

  const animate = () => {
    if (!animateHeaderRef.current || !ctxRef.current) return;

    ctxRef.current.clearRect(0, 0, widthRef.current, heightRef.current);

    pointsRef.current.forEach(point => {
      const distance = getDistance(targetRef.current, point);

      if (distance < 4000) {
        point.active = 0.3;
        point.circle.active = 0.6;
      } else if (distance < 20000) {
        point.active = 0.1;
        point.circle.active = 0.3;
      } else if (distance < 40000) {
        point.active = 0.02;
        point.circle.active = 0.1;
      } else {
        point.active = 0;
        point.circle.active = 0;
      }

      drawLines(point);
      point.circle.draw();
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(credentials);
      setCredentials({ username: '', password: '' });
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Ocurrió un error durante el inicio de sesión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      initHeader();

      if (!('ontouchstart' in window)) {
        window.addEventListener('mousemove', mouseMove);
      }
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);

      animate();
      pointsRef.current.forEach(point => shiftPoint(point));
    } catch (error) {
      console.error('Animation initialization error:', error);
    }

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('scroll', scrollCheck);
      window.removeEventListener('resize', resize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div id="large-header" className="large-header" ref={headerRef}>
      <canvas id="demo-canvas" ref={canvasRef}></canvas>
      <div className="main-title form-block">
        <div id="title">
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Wiki Paralegal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            A safe place for Paralegals
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({
                  ...credentials,
                  username: e.target.value
                })}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({
                  ...credentials,
                  password: e.target.value
                })}
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimatedLogin;