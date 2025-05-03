
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserType } from '@/types/auth';

interface CustomSignUpData {
  name: string;
  email: string;
  password: string;
  role: string; 
  acceptTerms: boolean;
  phone?: string;
  nif?: string;
  address?: string;
  userType?: string;
  professionalData?: {
    licenseNumber: string;
    professionalEmail: string;
    professionalAddress: string;
    barAssociationId: string;
    companyAffiliated: boolean;
  };
  companyData?: {
    name: string;
    nif: string;
    cae: string;
    email: string;
    phone: string;
    address: string;
  };
}

export const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<string>('individual');
  const [error, setError] = useState('');
  const { signUp } = useAuth();

  const handleUserTypeSelect = (type: string) => {
    setUserType(type);
    setCurrentStep(2);
  };

  const [formData, setFormData] = useState({
    nome: '',
    nif: '',
    email: '',
    password: '',
    telemovel: '',
    morada: '',
    cedulaProfissional: '',
    ordemProfissional: '',
    empresaVinculada: false,
    // Dados da empresa
    empresaNome: '',
    empresaNIF: '',
    empresaCAE: '',
    empresaEmail: '',
    empresaTelefone: '',
    empresaMorada: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitPersonalData = async () => {
    if (!formData.nome || !formData.nif || !formData.email || !formData.password) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    if (userType === 'professional') {
      setCurrentStep(3); // Próximo passo: dados profissionais
    } else {
      try {
        const signUpData: CustomSignUpData = {
          name: formData.nome,
          email: formData.email,
          password: formData.password,
          role: userType,
          acceptTerms: true,
          phone: formData.telemovel,
          nif: formData.nif,
          address: formData.morada
        };
        
        await signUp(signUpData);
      } catch (err: any) {
        setError(err.message || 'Erro ao processar o registro');
      }
    }
  };

  const handleSubmitCompanyData = async () => {
    setError('');
    try {
      if (!formData.empresaNome || !formData.empresaNIF || !formData.empresaCAE || !formData.empresaEmail) {
        alert('Preencha os campos obrigatórios da empresa!');
        return;
      }
      
      const emailExists = false; // TODO: Implement email existence check
      if (emailExists) {
        setError('Este email corporativo já está registrado');
        return;
      }
      
      const signUpData: CustomSignUpData = {
        name: formData.empresaNome,
        email: formData.empresaEmail,
        password: formData.password,
        role: 'company',
        acceptTerms: true,
        nif: formData.empresaNIF,
        companyData: {
          name: formData.empresaNome,
          nif: formData.empresaNIF,
          cae: formData.empresaCAE,
          email: formData.empresaEmail,
          phone: formData.empresaTelefone,
          address: formData.empresaMorada
        }
      };
      
      await signUp(signUpData);
    } catch (err: any) {
      setError(err.message || 'Erro ao processar o registro da empresa');
    }
  };

  return (
    <div className="signup-flow">
      {currentStep === 1 && (
        <div className="user-type-selection">
          <h2>Selecione o tipo de utilizador</h2>
          <button onClick={() => handleUserTypeSelect('individual')}>
            Particular
          </button>
          <button onClick={() => handleUserTypeSelect('professional')}>
            Profissional
          </button>
          <button onClick={() => handleUserTypeSelect('company')}>
            Empresa
          </button>
        </div>
      )}

      {currentStep === 2 && userType && (
        <div className="personal-data-form">
          <h2>Dados {userType === 'company' ? 'da Empresa' : 'Pessoais'}</h2>
          
          <input
            name="nome"
            placeholder={userType === 'company' ? 'Nome da Empresa*' : 'Nome Completo*'}
            required
            onChange={handleInputChange}
          />

          <input
            name="nif"
            placeholder="NIF*"
            required
            pattern="\d{9}"
            onChange={handleInputChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email*"
            required
            onChange={handleInputChange}
          />

          {userType !== 'company' && (
            <>
              <input
                name="telemovel"
                placeholder="Telemóvel"
                onChange={handleInputChange}
              />

              <input
                name="morada"
                placeholder="Morada"
                onChange={handleInputChange}
              />
            </>
          )}

          {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}
          <button onClick={handleSubmitPersonalData}>
            {userType === 'professional' ? 'Continuar' : 'Registar'}
          </button>
        </div>
      )}

      {currentStep === 3 && (
        <div className="professional-data-form">
          <h2>Dados Profissionais</h2>
          
          <input
            name="cedulaProfissional"
            placeholder="Número da Cédula Profissional*"
            required
            onChange={handleInputChange}
          />

          <input
            name="ordemProfissional"
            placeholder="Identificação da Ordem*"
            required
            onChange={handleInputChange}
          />

          <label>
            <input
              type="checkbox"
              checked={formData.empresaVinculada}
              onChange={(e) => setFormData({...formData, empresaVinculada: e.target.checked})}
            />
            Estou vinculado a uma empresa
          </label>

          <button onClick={() => { 
            if (formData.empresaVinculada) {
              setCurrentStep(4); 
            } else {
              const signUpData: CustomSignUpData = {
                name: formData.nome,
                email: formData.email,
                password: formData.password,
                role: 'professional',
                acceptTerms: true,
                nif: formData.nif,
                professionalData: {
                  licenseNumber: formData.cedulaProfissional,
                  professionalEmail: formData.email,
                  professionalAddress: formData.morada || '',
                  barAssociationId: formData.ordemProfissional,
                  companyAffiliated: formData.empresaVinculada
                }
              };
              
              signUp(signUpData);
            }
          }}>
            {formData.empresaVinculada ? 'Continuar' : 'Registar'}
          </button>
        </div>
      )}

      {currentStep === 4 && (
        <div className="company-data-form">
          <h2>Dados da Empresa</h2>
          
          <input
            name="empresaNome"
            placeholder="Nome da Empresa*"
            required
            onChange={handleInputChange}
          />

          <input
            name="empresaNIF"
            placeholder="NIF da Empresa*"
            required
            pattern="\d{9}"
            onChange={handleInputChange}
          />

          <input
            name="empresaCAE"
            placeholder="CAE*"
            required
            onChange={handleInputChange}
          />

          <input
            type="email"
            name="empresaEmail"
            placeholder="Email Corporativo*"
            required
            onChange={handleInputChange}
          />

          <input
            name="empresaTelefone"
            placeholder="Telefone/Telemóvel*"
            required
            onChange={handleInputChange}
          />

          <input
            name="empresaMorada"
            placeholder="Morada da Sede*"
            required
            onChange={handleInputChange}
          />

          {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}
          <button onClick={handleSubmitCompanyData}>
            Registar
          </button>
        </div>
      )}
    </div>
  );
};
