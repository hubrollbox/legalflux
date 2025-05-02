
# RESOLUÇÃO DO ERRO DO TSCONFIG.JSON

## Problema Específico

O erro atual está relacionado com a referência ao projeto em tsconfig.json:

```
tsconfig.json(26,18): error TS6310: Referenced project '/dev-server/tsconfig.node.json' may not disable emit.
```

## Solução Rápida

1. Abra o seu arquivo `tsconfig.json`
2. Remova completamente a seguinte linha:
   ```json
   "references": [{ "path": "./tsconfig.node.json" }]
   ```
3. Salve o arquivo e reinicie o servidor de desenvolvimento

## Configuração Alternativa

Se não conseguir editar diretamente o arquivo `tsconfig.json`, copie a configuração completa de `src/tsconfig.json.temp` para um novo arquivo tsconfig.json no projeto.

A configuração em `src/tsconfig.json.temp` já foi atualizada para remover a referência problemática e inclui todas as configurações necessárias para o projeto funcionar corretamente.
