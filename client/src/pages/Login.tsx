/**
 * SGPD - Página de Login (Acessível)
 * Design: Modernismo Corporativo - WCAG 2.1 AA
 * Componentes: AccessibleInput, AccessibleButton, SkipToMainContent
 */

import React, { useState } from 'react';
import { AccessibleButton, AccessibleInput, SkipToMainContent } from '@/components/AccessibleComponents';

interface LoginPageProps {
  onLogin?: (email: string, password: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos obrigatórios');
      setIsLoading(false);
      return;
    }

    // Simulação de login
    setTimeout(() => {
      if (email && password) {
        onLogin?.(email, password);
      } else {
        setError('Credenciais inválidas');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Skip to main content link (acessibilidade) */}
      <SkipToMainContent />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">SGPD</h1>
            <p className="text-gray-600">Sistema de Gestão de Pedidos e Demandas</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bem-vindo</h2>

            {/* Error Alert */}
            {error && (
              <div
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md"
                role="alert"
              >
                <p className="text-sm text-red-800 font-medium">
                  ⚠️ {error}
                </p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <AccessibleInput
                id="email"
                label="Email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired={true}
                error={error && !email ? 'Email é obrigatório' : undefined}
                helperText="Insira seu email corporativo"
              />

              {/* Password Input */}
              <AccessibleInput
                id="password"
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired={true}
                error={error && !password ? 'Senha é obrigatória' : undefined}
                helperText="Mínimo 8 caracteres"
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    aria-label="Lembrar-me neste dispositivo"
                  />
                  <span className="text-gray-700">Lembrar-me</span>
                </label>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                >
                  Esqueceu a senha?
                </a>
              </div>

              {/* Submit Button */}
              <AccessibleButton
                variant="primary"
                size="lg"
                className="w-full mt-6"
                isLoading={isLoading}
                type="submit"
                ariaLabel="Fazer login no sistema"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </AccessibleButton>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Não tem uma conta?{' '}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
              >
                Solicite acesso
              </a>
            </div>
          </div>

          {/* Demo Info */}
          <div
            className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
            role="note"
            aria-label="Informação de demonstração"
          >
            <p className="text-sm text-blue-900">
              <strong>Demo:</strong> Use qualquer email e senha para entrar
            </p>
          </div>

          {/* Accessibility Info */}
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>
              Acessibilidade: Navegação por teclado (Tab), leitor de tela compatível (NVDA/JAWS/VoiceOver)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
