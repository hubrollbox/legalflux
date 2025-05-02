
# INSTRUÇÕES IMPORTANTES PARA CONFIGURAÇÃO DO TYPESCRIPT

Como o arquivo `tsconfig.json` é somente leitura e não pode ser modificado diretamente, siga estas instruções para atualizar manualmente a configuração:

## Alterações necessárias no tsconfig.json:

1. Adicione as seguintes opções às "compilerOptions":

```json
"allowSyntheticDefaultImports": true,
"downlevelIteration": true,
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

2. Estas alterações são necessárias para:
   - Permitir importações sintéticas padrão do React
   - Suportar iteração em Sets e outras coleções
   - Configurar os aliases de caminho para referências @/

## Como aplicar:

Como você não pode modificar diretamente o tsconfig.json, solicite ao administrador do sistema para adicionar estas opções ao arquivo de configuração.

## Problemas que estas alterações resolvem:

- Erros de importação de módulos (React, componentes com '@/')
- Erros de iteração em Sets
- Problemas com caminhos de módulos e alias

Depois de aplicar estas alterações, reinicie o servidor de desenvolvimento para que as alterações entrem em vigor.
