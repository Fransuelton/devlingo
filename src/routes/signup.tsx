import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, createFileRoute } from '@tanstack/react-router';

// ============================================================================
// VALIDAÇÃO COM ZOD
// ============================================================================
const SignUpSchema = z
  .object({
    email: z
      .string()
      .email('Por favor, insira um email válido')
      .min(1, 'Email é obrigatório'),
    password: z
      .string()
      .min(6, 'Senha deve ter no mínimo 6 caracteres')
      .min(1, 'Senha é obrigatória'),
    confirmPassword: z
      .string()
      .min(1, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof SignUpSchema>;

// ============================================================================
// COMPONENTE SPINNER ANIMADO
// ============================================================================
function Loader2Icon() {
  return (
    <svg
      className="animate-spin"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.218-8.307" />
    </svg>
  );
}

// ============================================================================
// COMPONENTE SIGNUP
// ============================================================================
function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      // Simular chamada de API
      console.log('Dados de cadastro:', {
        email: data.email,
        password: data.password,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Aqui você chamaria a API de registro do Supabase
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#820AD1] flex items-center justify-center px-4">
      {/* Card Principal */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Criar Conta
        </h1>

        {/* Subtítulo */}
        <p className="text-gray-500 text-center mb-8">
          Insira seus dados para se cadastrar
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register('email')}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#820AD1] focus:border-transparent ${
                errors.email
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-white'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-medium mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo Senha */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="........"
              {...register('password')}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#820AD1] focus:border-transparent ${
                errors.password
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-white'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm font-medium mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Campo Confirmar Senha */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="........"
              {...register('confirmPassword')}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#820AD1] focus:border-transparent ${
                errors.confirmPassword
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-white'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm font-medium mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Botão de Ação */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className={`w-full h-12 rounded-lg font-bold text-white text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              isSubmitting || isLoading
                ? 'bg-[#6B0AB0] opacity-70 cursor-not-allowed'
                : 'bg-[#820AD1] hover:bg-[#6B0AB0] active:scale-95'
            }`}
          >
            {isSubmitting || isLoading ? (
              <>
                <Loader2Icon />
                <span>Cadastrando...</span>
              </>
            ) : (
              'Cadastre-se'
            )}
          </button>
        </form>

        {/* Rodapé */}
        <div className="mt-8 text-center text-gray-600">
          Já tem uma conta?{' '}
          <Link
            to="/signin"
            className="text-[#820AD1] font-bold hover:text-[#6B0AB0] transition-colors duration-200"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EXPORTAR ROTA TANSTACK ROUTER
// ============================================================================
export const Route = createFileRoute('/signup')({
  component: SignUp,
});
