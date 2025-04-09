import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

type UserType = 'particular' | 'profissional' | 'empresa';

export const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<UserType>();
  const { signUp } = useAuth();

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setCurrentStep(2);
  };

  const [formData, setFormData] = useState({
    nome: '',
    nif: '',
    email: '',
    telemovel: '',
    morada: '',
    cedulaProfissional: '',
    ordemProfissional: '',
    empresaVinculada: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitPersonalData = () => {
    // Validação básica
    if (!formData.nome || !formData.nif || !formData.email) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    if (userType === 'profissional') {
      setCurrentStep(3); // Próximo passo: dados profissionais
    } else {
      // Enviar dados para API
      signUp(formData);
    }
  };

  const handleSubmitCompanyData = () => {
    if (!formData.empresaNome || !formData.empresaNIF || !formData.empresaCAE || !formData.empresaEmail) {
      alert('Preencha os campos obrigatórios da empresa!');
      return;
    }
    signUp(formData);
  };

  return (
    <div className="signup-flow">
      {currentStep === 1 && (
        <div className="user-type-selection">
          <h2>Selecione o tipo de utilizador</h2>
          <button onClick={() => handleUserTypeSelect('particular')}>
            Particular
          </button>
          <button onClick={() => handleUserTypeSelect('profissional')}>
            Profissional
          </button>
          <button onClick={() => handleUserTypeSelect('empresa')}>
            Empresa
          </button>
        </div>
      )}

      {currentStep === 2 && userType && (
        <div className="personal-data-form">
          <h2>Dados {userType === 'empresa' ? 'da Empresa' : 'Pessoais'}</h2>
          
          <input
            name="nome"
            placeholder={userType === 'empresa' ? 'Nome da Empresa*' : 'Nome Completo*'}
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

          {userType !== 'empresa' && (
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

          <button onClick={handleSubmitPersonalData}>
            {userType === 'profissional' ? 'Continuar' : 'Registar'}
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

          <button onClick={() => formData.empresaVinculada ? setCurrentStep(4) : signUp(formData)}>
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

          <button onClick={handleSubmitCompanyData}>
            Registar
          </button>
        </div>
      )}
    </div>
  );
};