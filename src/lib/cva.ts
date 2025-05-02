
// Implementação simplificada de class-variance-authority para evitar dependências extras
// Esta é uma versão mais simples da biblioteca real, apenas para garantir que os componentes funcionem

export interface VariantProps<T extends (...args: any) => any> {
  // Esta é uma versão simplificada do tipo real
}

export function cva(base: string, options: any = {}) {
  return function(props: any = {}) {
    const variant = props.variant ? options.variants.variant?.[props.variant] || "" : "";
    const size = props.size ? options.variants.size?.[props.size] || "" : "";
    const className = props.className || "";

    return [base, variant, size, className].filter(Boolean).join(" ");
  };
}
