import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { AuthProvider } from '../src/contexts/AuthProvider';
import { AuthContext } from '../src/contexts/AuthProvider';

// Mock supabase
jest.mock('../src/lib/supabase-client', () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      signInWithPassword: jest.fn().mockResolvedValue({ error: null }),
      signUp: jest.fn().mockResolvedValue({ data: {}, error: null }),
      signOut: jest.fn().mockResolvedValue({ error: null }),
      resetPasswordForEmail: jest.fn().mockResolvedValue({ data: {}, error: null }),
      updateUser: jest.fn().mockResolvedValue({ data: {}, error: null }),
      onAuthStateChange: jest.fn().mockReturnValue({ data: { unsubscribe: jest.fn() } }),
    },
  },
}));

describe('AuthProvider', () => {
  it('deve renderizar o AuthProvider e fornecer contexto', async () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(AuthContext);
      return <div>Test</div>;
    };
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(contextValue).toBeDefined();
    expect(contextValue.isAuthenticated).toBe(false);
  });

  it('deve chamar login e atualizar estado', async () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(AuthContext);
      return <div>Test</div>;
    };
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await act(async () => {
      await contextValue.login('test@email.com', '123456');
    });
    expect(contextValue.isLoading).toBe(false);
    expect(contextValue.error).toBe(null);
  });

  it('deve chamar register e atualizar estado', async () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(AuthContext);
      return <div>Test</div>;
    };
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await act(async () => {
      await contextValue.register('test@email.com', '123456', 'Test User');
    });
    expect(contextValue.isLoading).toBe(false);
    expect(contextValue.error).toBe(null);
  });

  it('deve chamar forgotPassword sem erro', async () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(AuthContext);
      return <div>Test</div>;
    };
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await act(async () => {
      await contextValue.forgotPassword('test@email.com');
    });
    expect(contextValue.isLoading).toBe(false);
    expect(contextValue.error).toBe(null);
  });

  it('deve chamar resetPassword sem erro', async () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(AuthContext);
      return <div>Test</div>;
    };
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await act(async () => {
      await contextValue.resetPassword('token', 'newpassword');
    });
    expect(contextValue.isLoading).toBe(false);
    expect(contextValue.error).toBe(null);
  });
});